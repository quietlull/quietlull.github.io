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
