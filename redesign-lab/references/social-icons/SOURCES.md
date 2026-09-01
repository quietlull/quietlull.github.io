# Social icons — Simple Icons

Fetched 2026-08-23 from `https://unpkg.com/simple-icons@13.0.0/icons/<slug>.svg`, verbatim.

| window | slug | file |
|---|---|---|
| GitHub | `github` | github.svg |
| Twitter | `x` | x.svg |
| LinkedIn | `linkedin` | linkedin.svg |
| ArtStation | `artstation` | artstation.svg |
| itch.io | `itchdotio` | itchdotio.svg |

**Same basis as `references/tool-icons/`**, which the skills-row already uses: Simple Icons ships
the icon files under CC0. The marks themselves remain the trademarks of their respective owners and
are used here for the one purpose that needs no permission — labelling a link to that platform.

**Inlined, not `<img>`,** for the same reason skills-row gives: an `<img>` cannot be recoloured from
outside, and these have to take the window's own colour. Geometry is byte-identical to the files in
this folder; only the brand `fill` is dropped so CSS can supply it.

**No icon is drawn or approximated.** If a platform were missing from Simple Icons it would be left
absent rather than faked — which is exactly what skills-row did for C# and HLSL.
