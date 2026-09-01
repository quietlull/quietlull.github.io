FROZEN COPY of every lab stylesheet as it was BEFORE the cascade-layer refactor
(2026-08-23, Rod: "keep a copy of the original to see what breaks").

Nothing links these. They exist so layer-diff.html can render the same page twice,
once against this set and once against the live set, and so the refactor can be
reversed by copying this directory back over the originals.
