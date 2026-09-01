# SOURCE: harumaki "Gen'eiten" (幻影展) palette — pixel-sampled 2026-06-12

Rod's reference for the twilight-festival palette. Sampled (System.Drawing, quantized + saturated-
accent filter) from harumakigohan's exhibition flyers:
- https://harumakigohan.com/gnep/img/geneiten.jpg  (glowing blue line-art figures)
- https://harumakigohan.com/gnep/img/geneiten2.jpg (official goods: sunset + cyan discs)
- https://harumakigohan.com/gnep/img/geneiten3.jpg (sign-event flyer: gold + coral text)

## Sampled values
| Role | Harumaki (sampled) | Rod's token | Match? |
|---|---|---|---|
| Night ground | `#000018`–`#001830` (rgb ~0,12,30) | `--color-night #070c23` | very close (theirs darker/bluer) |
| Warm gold | `#f0c048` / `#d8c048` (240,192,72) | `--color-gold #fbbf24` | very close (theirs slightly yellower) |
| Ember orange | `#f06000` / `#f04818` (240,96,0) | `--color-glow #ff6a00` | very close |
| Cream text | `#f0ffff` / `#ffffff` | `--color-text #f5f3ef` | close |
| **Cool — teal-cyan** | `#3090a8` (48,144,168) -> bright `#78c0c0` (120,192,192) | (was provisional `#6fa8d4`) | the disc/UI accent |
| **Cool — cobalt** | `#1830a8` (24,48,168) / `#1818a8` | (n/a) | the glowing-figures blue |

## Conclusion
Rod's warm ramp + night were already accurate to the reference. The ONLY correction: the cool
accent. Harumaki's cool note is a TEAL-CYAN (bright, used on the disc charms + link text — reads
as a distinct top note on navy) or a deep COBALT-electric blue (the iconic glowing figures, but
close in value to the ground so lower-contrast). Provisional `#6fa8d4` (soft sky) was wrong.

`--color-accent-cool` set to the sampled teal-cyan `#3090a8` (brighten toward `#78c0c0` on the
Palette page if more pop is wanted). Cobalt `#1830a8` recorded as the alternative.
