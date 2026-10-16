---
name: feedback-bench-is-ours-not-provenance
description: "ONLY components on the workbench are made by us. The bench and the rework-*.html pages are OUR work, never a source. Citing them as provenance is circular and is lying."
metadata:
  node_type: memory
  type: feedback
---

# The workbench is OURS. It is never provenance.

**Rod, 2026-08-16: "ONLY components on the workbench are actually made by us."**

Everything in `redesign-lab/extracted/components/` and every `rework-*.html` page is something WE
built. They are **source candidates** - things that feed provenance - not sources. Citing one as a
parent is circular, and stating it to Rod as though it were a real site is lying to him.

## The specific failure that produced this rule

The `tldr-callout` CSS header says *"PROVENANCE: rework-hana.html .tldr"* and `quote-block` says
*"shape = rework-harumaki.html .prose blockquote"*. I read those headers and told Rod the callouts
had "real parents - hana for the TL;DR, harumaki x hana for the quote". He checked:

> "You are confidently lying because these are not anywhere to be found on hana. Unless you mean
> our AI generated hana copy."

He was right. `rework-hana.html` is titled *"Element REWORK - Hana (distinct shapes)"* - our own
build, named after a site it was inspired by. The citation launders our own work through a
filename that sounds like a source.

## How to apply

- A source is a **live external site whose CSS you fetched**, or a real snippet Rod supplied. That
  is the whole list.
- `rework-*.html`, `extracted/components/`, `ref-*.html` rebuilds, and any lab page are **ours**.
  Never cite them as a parent.
- A CSS header comment claiming provenance is a CLAIM, not evidence. Check what it points AT. If it
  points at another file in this repo, the chain has not left the building and there is no source.
- When reporting to Rod, say "we built this" plainly. Do not dress our own work in a reference's
  name.

See [[feedback-verify-the-premise]] - this is the same root cause as the other four failures:
the mechanics were real and the premise was never tested.
