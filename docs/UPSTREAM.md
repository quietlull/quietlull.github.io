# Upstream (Chirpy)

Divergences from upstream jekyll-theme-chirpy, and upstream issues we flag rather than silently
fix. This is the memory a theme update or swap needs.

## Fork facts

- Forked whole-repo (early commits "chirpy theme" / "Changing to chirpy"), then customized in
  place across ~228 commits. Upstream's own `jekyll-theme-chirpy.gemspec` still sits at the repo
  root and `_config.yml` still declares `theme: jekyll-theme-chirpy` - both are vestigial and
  misleading; their fate is a Phase 1 item.
- Upstream base version: UNKNOWN - pin it during the Phase 1 diff (find the fork point commit and
  record the upstream tag here; the audit diffs against that tag, not upstream HEAD).

## Deliberate divergences (flagged-not-fixed does NOT apply - these are ours, on purpose)

- Locales pruned from 32 languages to `en.yml` only.
- Upstream docs (`CHANGELOG.md`, `CONTRIBUTING.md`, etc.), `authors.yml`, unused includes
  (`projectfilterandsearch.html`) and layouts (`projects.html`) deleted as cruft.
- `_sass/` restructured from Chirpy's `addon/`/`colors/` layout into our 7-bucket architecture -
  this makes a straight upstream merge impossible; updates must be cherry-picked by hand.
- `topbar.html`, `head.html`, `default.html`, `post.html` carry spliced-in custom logic
  (Phase 1 extracts it; see [THEME-BOUNDARY.md](THEME-BOUNDARY.md)).

## Flagged, not fixed

(Upstream bugs or oddities we noticed but left alone - record here with a date so a future update
knows they are not ours. None recorded yet.)

## Patched upstream behavior

(Places where we changed what stock Chirpy does and a theme update would silently revert us.
Fill during the Phase 1 diff.)

## media-url.html prepends a folder to paths that are already absolute (PATCHED 2026-08-26)

**Upstream file:** `_includes/media-url.html`, Chirpy 7.3.1.

It guards with `unless url contains ':'`, which catches `http://` but not a root-relative path. So a
post that declares `media_subpath` and points at a shared asset gets the subpath prepended to a path
that was already resolved:

    /assets/img/placeholder-wip.svg  ->  /assets/media/ComputeGrass/assets/img/placeholder-wip.svg

**21 broken images across 8 posts, and html-proofer fails on every one**, which blocks the deploy
workflow. Found while reproducing CI locally before the merge to main.

**D2 says flag upstream bugs rather than fix them silently. This is flagged AND fixed**, because it
blocked a merge and the fix is a two-line guard that cannot be wrong: an absolute path is already
resolved, so nothing may be prepended to it. Patch is commented in place and points here.

**If Chirpy is ever updated, re-apply this.** The symptom is doubled path segments in `<img src>` and
it does not error - the page renders with broken images and nothing in the console.
