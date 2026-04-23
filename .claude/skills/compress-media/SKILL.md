---
name: compress-media
description: Compress GIF files to MP4 for web delivery (90%+ size reduction with identical autoplay/loop/muted behavior), and update markdown/HTML references automatically. Also handles in-place GIF optimization with gifsicle for files that must stay as GIFs.
allowed-tools: Read Grep Glob Edit Write Bash
---

# Compress Media

Convert heavy GIF files to lightweight MP4s and update references across the codebase. Reserves the option to keep small GIFs as GIFs via gifsicle optimization.

## When to use

- The user asks to compress media, optimize images, reduce repo size, or fix slow page loads
- A GitHub push warns about files >50MB
- Audit finds large GIFs hurting performance
- The user invokes `/compress-media`

## Prerequisites check

Always run these checks first and stop if tools are missing:

```bash
ffmpeg -version | head -1   # need ffmpeg for GIF→MP4
gifsicle --version | head -1 # optional — only if the user wants GIF optimization
```

If ffmpeg is missing, stop and tell the user:
```
ffmpeg is not installed. Install it first:
  winget install --id=Gyan.FFmpeg -e        # Windows
  brew install ffmpeg                        # macOS
  sudo apt install ffmpeg                    # Linux/WSL
Then restart the terminal.
```

## Decision tree

1. **Find input scope.** Ask the user, or infer from the request:
   - Specific file(s): `input.gif`
   - Folder: `assets/media/GrassCompute/`
   - All GIFs in repo: `assets/media/**/*.gif`

2. **Measure current state.** Run `ls -lh` or equivalent to show current file sizes. This lets the user set expectations and see savings later.

3. **Classify by size.**
   - `>= 5 MB`: Convert to MP4 (big savings, worth the markup change)
   - `1-5 MB`: Ask user — convert to MP4 OR compress in-place with gifsicle
   - `< 1 MB`: Usually skip. Offer gifsicle if user wants consistency.

4. **Transparency check.** GIF supports 1-bit alpha; MP4 does not. Ask the user if any GIFs have transparent backgrounds that need to be preserved. If yes, either keep those as GIFs with gifsicle or convert to WebM with alpha channel (vp9 codec).

5. **Get user confirmation** on plan (which files, target format) before running any conversions.

## The conversion command

Standard GIF → MP4 (use this for 99% of cases):

```bash
ffmpeg -i "input.gif" \
  -movflags faststart \
  -pix_fmt yuv420p \
  -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" \
  -crf 23 \
  -y \
  "output.mp4"
```

**Flags explained:**
- `-movflags faststart`: metadata at file start → progressive streaming (plays before fully downloaded)
- `-pix_fmt yuv420p`: max browser compatibility (YUV 4:2:0 is universal)
- `-vf "scale=..."`: force even dimensions (h264 hard requirement; rejects odd pixel widths/heights)
- `-crf 23`: quality/size tradeoff. 18 = near-lossless, 23 = sweet spot, 28 = smaller
- `-y`: overwrite without prompting

**For GIFs with transparency that must preserve alpha:**

```bash
ffmpeg -i "input.gif" -c:v libvpx-vp9 -pix_fmt yuva420p -crf 30 -b:v 0 -y "output.webm"
```

**For in-place GIF optimization (keeping as GIF):**

```bash
gifsicle -O3 --lossy=80 --colors 128 "input.gif" -o "output.gif"
```
Typical savings: 30-60% with minor quality loss.

## Updating references

Before converting, grep for all references so nothing is missed:

```bash
grep -rn "filename\.gif" --include="*.md" --include="*.html" --include="*.scss" .
```

**Markdown replacement** — change:

```markdown
![alt text](filename.gif)
```

To:

```markdown
<video src="{{ '/path/to/filename.mp4' | relative_url }}"
       autoplay muted loop playsinline
       aria-label="alt text"></video>
```

Important HTML attributes — all required:

- `autoplay` — starts automatically
- `muted` — required by browsers for autoplay to work without user gesture
- `loop` — infinite loop like a GIF
- `playsinline` — critical for iOS: prevents fullscreen takeover on tap

**Jekyll `media_subpath` consideration:** If the post has `media_subpath: '/assets/media/Folder'` in frontmatter, the markdown uses bare filenames (`file.gif`), and Jekyll prepends the path automatically. For `<video>` tags, you need the full path because Liquid `relative_url` doesn't know about `media_subpath`. So include the full path in the video src.

**Frontmatter `image.path`** — if a post's preview image was a GIF that you converted, update the frontmatter too:

```yaml
image:
  path: assets/media/Folder/hero.mp4   # was hero.gif
```

This works for video previews because the post layout renders whatever extension is provided.

## Batch script template

For a folder of GIFs, write this to a temp bash file and execute:

```bash
#!/usr/bin/env bash
set -e
cd "<target folder>"

for f in *.gif; do
  [ -e "$f" ] || continue
  base="${f%.gif}"
  # Skip if already converted
  [ -e "${base}.mp4" ] && { echo "skip $f (mp4 exists)"; continue; }
  # Skip small files (adjust threshold as needed)
  size=$(stat -c%s "$f" 2>/dev/null || stat -f%z "$f")
  if [ "$size" -lt 5242880 ]; then
    echo "skip $f (under 5MB)"
    continue
  fi
  echo "converting $f..."
  ffmpeg -i "$f" -movflags faststart -pix_fmt yuv420p \
    -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" -crf 23 -y "${base}.mp4"
done
```

## Verification checklist

After conversion and reference updates:

1. **Build the site locally.** For Jekyll: `bundle exec jekyll build`. Confirm no errors.
2. **Open the affected pages in a browser.** Verify videos auto-play, loop, and are silent. Check on mobile size if possible.
3. **Check for orphaned references.** Re-run the grep from earlier with the `.gif` extension to confirm nothing still points to the old file.
4. **Report savings to user.** Sum before/after sizes and percentage saved.

## Cleanup

After user confirms everything works:
- **Do NOT delete the original GIFs in the same commit** as the MP4 conversion. Keep them one commit longer so rollback is easy.
- Delete in a follow-up commit once the user has verified the deployed site works.

## Common pitfalls

- **Odd dimensions** — h264 requires even width and height. The `scale=trunc(iw/2)*2:trunc(ih/2)*2` filter handles this.
- **Frame rate spike** — GIFs sometimes have weird inconsistent frame timings. Add `-r 30` to force 30fps if playback looks janky.
- **iOS Safari** — without `playsinline`, tapping the video opens fullscreen. Always include it.
- **Markdown escapes** — video tags in markdown work natively in most Jekyll processors (kramdown). If content is wrapped in `{::options parse_block_html="true" /}` the tag will parse. Usually no extra config needed.
- **LFS stale references** — if the repo used Git LFS previously and you already migrated off, make sure `.gitattributes` doesn't still filter `*.gif`.
