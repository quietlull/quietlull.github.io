# Tool icons — official marks

Rod, 2026-08-22: *"alot of these symbols need to be changed i also want to remove three.js and get
more official symbols for unity, git, compute, blender, c#, and render doc."*

This closes a caveat that has been on the ledger since the component was built: *"REAL official
tool SVGs still owed"* and *"icon geometry = hand-approx"*. The existing `draw-in-icons` shapes are
hand-approximations, which is its own provenance problem regardless of the circular citation.

## Held (4 of 6)

| tool | file | source | licence |
|---|---|---|---|
| Unity | `unity.svg` | https://cdn.simpleicons.org/unity | CC0 1.0 |
| Git | `git.svg` | https://cdn.simpleicons.org/git | CC0 1.0 |
| Blender | `blender.svg` | https://cdn.simpleicons.org/blender | CC0 1.0 |
| RenderDoc | `renderdoc.svg` | https://renderdoc.org/fp/logo.svg — the project's own mark | project site |

Simple Icons' CC0 1.0 dedication was read directly from its repository LICENSE.md, not assumed.
All three of its marks are single-path at `viewBox="0 0 24 24"`, which is what makes them drop
cleanly into a `pathLength="1"` draw-in — one path, one dash animation, no per-icon measurement.

RenderDoc's is different in shape: `1024x1024`, TWO paths, and it is a **filled badge** (a green
`#3bb779` square with a white aperture) rather than a line mark. It will not draw in the same way
and will need either a re-trace to an outline or an exception.

## NOT held (2 of 6) — these need Rod's call

- **C#** — not in Simple Icons; they carry no C# mark. `dotnet` IS available and is the nearest
  official relative, but it is the .NET mark, not the C# one. The alternative is the Microsoft C#
  logo from their brand assets, which is a different licence question.
- **Compute** — there is no official mark, because it is not a product. It is a concept. The real
  choices are a generic glyph (what the component does now), or naming a concrete API instead:
  `vulkan` and `opengl` both exist in Simple Icons and were confirmed available.

## Removed

- **Three.js** — dropped on Rod's instruction. `threedotjs` exists in Simple Icons if it returns.

## Trademark note, stated once

These are trademarks. Listing them to say "these are the tools I use" is ordinary nominative use
and is what a portfolio does. The CC0 dedication covers the SVG files, not the underlying marks.
Nothing here should be recoloured into a brand-confusing lockup or used as a site logo.

---

# DECIDED 2026-08-22: devicon, full colour, multipath

Rod: *"icons being mutipath is perfectly fine lets go with that."*

So the fork closed in favour of the real brand marks over the draw-in animation. Held now:

| tool | file | paths | source | licence |
|---|---|---|---|---|
| C# | `dev-csharp.svg` | 3 | devicon | MIT |
| Unity | `dev-unity.svg` | 3 | devicon | MIT |
| Blender | `dev-blender.svg` | 2 | devicon | MIT |
| Git | `dev-git.svg` | 1 | devicon | MIT |
| RenderDoc | `renderdoc.svg` | 2 | renderdoc.org (own mark) | project site |
| OpenGL | `dev-opengl.svg` | 4 | devicon | MIT | *(candidate for the Compute slot)* |
| Vulkan | `dev-vulkan.svg` | 1 | devicon | MIT | *(candidate for the Compute slot)* |

The single-path Simple Icons copies (`unity.svg`, `git.svg`, `blender.svg`) are kept rather than
deleted: they are the only versions that work with the `pathLength="1"` draw-in, so if the animation
is ever wanted back they are already here.

## What this costs, stated once so it is not rediscovered

- **The draw-in animation does not survive.** It needs one path and one dash; these are 1-4 paths
  each with their own fills. The component's `pathLength` machinery becomes dead code for these
  icons and should be removed rather than left in place.
- **Six brand palettes arrive at once** - C# purple, Blender orange/blue, Git red-orange, Unity
  grey. That cuts across the palette law (no cool accent, no red). Recolouring them to gold would
  make them monochrome silhouettes, at which point the Simple Icons versions are the better source.
  **This is Rod's call to make explicitly, not something to quietly resolve.**

## STILL UNRESOLVED

- **HLSL** - no official mark exists. It is a language, not a product.
- **Compute** - no official mark, same reason. `dev-opengl.svg` and `dev-vulkan.svg` are held as
  concrete API alternatives if Rod would rather name a real API than keep a generic glyph.
