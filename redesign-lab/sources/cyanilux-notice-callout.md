# Cyanilux `.notice` — the callout family

**Source:** https://www.cyanilux.com/css/style.css (live), read 2026-08-16
**Seen on:** https://www.cyanilux.com/tutorials/urp-shader-code/ and every tutorial page
**Why this site:** a working Unity/URP shader-tutorial site. Same subject matter as Rod's tech-art
write-ups, so its callouts are solving our actual problem rather than a marketing one. 100% CSS,
zero decorative images.

**Clears three ledger rows at once** — TL;DR, Takeaway and Blockquote are one component in three
roles, not three components. The existing ledger lead ("left-accent + tint + faint glow") is
SUPERSEDED by this: their device is a hatched left gutter plus a round chip, not an accent bar.

## Verbatim, as served

```css
.notice {
  margin: 5px 0px;
  display: flex;
  background-color: #282828;
  border-radius: 10px;
  border: 3px solid #303030;
}

.notice-left {
  /*background-color: #303030;*/
  margin-right: 10px;
  background: repeating-linear-gradient(
    45deg,
    #262626, #262626 12px,
    #202020 12px, #202020 24px
  );
  border-radius: 6px 0px 0px 6px;
}

.notice-exclamation {
  margin: 15px 10px;
  background-color: #00aabb;
  color: #202020;
  min-width: 28px;
  height: 28px;
  border-radius: 100%;
  font-weight: 700;
  font-size: 20px;
  text-align: center;
}

.notice > div > p { margin: 5px 0px; }
```

## The structure, in words

A flex row inside a 3px-bordered box at radius 10. The first child is a narrow **hatched gutter** —
a 45-degree repeating stripe at a 24px period (12px on, 12px off) — rounded only on its left
corners so it reads as a bound edge. Then a **28px circular chip** carrying a single bold glyph.
Then the text, whose paragraphs sit at a tight 5px rhythm.

The hatch is the distinctive part and it is worth keeping: it is procedural, costs nothing, and
gives the block a physical "caution tape" edge that a plain accent bar does not.

## What transfers, and what does not

| | |
|---|---|
| **Transfers** | The flex structure, 3px border at radius 10, the hatched gutter and its 12/24px period, the 28px round chip, the 5px paragraph rhythm |
| **Does NOT transfer** | `#00aabb` — their chip accent is **cyan**. The locked palette law is warm + blue DNA, blue only in the SKY, **no cool UI accent**. Use the gold ramp instead. |
| **Also ours, not theirs** | Their greys (#282828 / #303030 / #262626 / #202020) are a neutral dark scale. Ours is the night palette, so the values remap to `--color-panel-solid` and the line tokens. |

## How the three roles differ

One component, three variants, differing only in the chip glyph and which step of the gold ramp the
chip takes:

- **TL;DR** — chip glyph `i`, `--color-gold`
- **Takeaway** — chip glyph a star or check, `--color-gold-deep`
- **Blockquote** — chip glyph `"`, or drop the chip and keep only the hatched gutter

That makes the family a **Remix with one named parent** (Cyanilux), extended to three roles by us —
not three separate True transcriptions. Log it that way.

## Open question for Rod

Cyanilux uses ONE notice for everything. Splitting it into three roles is our extension. If Rod
would rather the three callouts read as genuinely different objects, this source only supports one
of them and the other two need their own references.
