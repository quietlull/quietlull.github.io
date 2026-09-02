/* WORKBENCH COPY, NOT THE SHIPPING FILE.
   The shipping version of this module is:
       _javascript/modules/config/storage-keys.js
   It has ALREADY DRIFTED from that file, so they are two different programs now.

   READ THIS BEFORE COPYING ANYTHING OUT OF HERE. The live tree is authoritative: it has
   received fixes this copy never saw, and a performance pass edits it independently. Porting
   from the lab to the site has already shipped stale code once, which is why this header
   exists rather than the file simply being deleted.

   IT IS KEPT ON PURPOSE, not by neglect. Checked 2026-09-02: every file under
   redesign-lab/scene/ and redesign-lab/effects/ is imported by something here. This one is
   reachable from the lab pages, and deleting it would break them. The scene files serve the
   character-scene track; the effects files serve the six final-*.html reference pages and
   the tuners Rod works from.

   Fixing a bug? Fix it in the shipping file. Change this one only when the LAB PAGE needs it. */
/**
 * Centralized localStorage key definitions.
 * Single source of truth — prevents key collisions and makes
 * the storage footprint auditable at a glance.
 */
export const STORAGE_KEYS = {
  BREATHING:    'breathe-disabled',
  SPARKLER:     'sparkler-disabled',
  FIREWORKS:    'auto-fireworks',
  ACHIEVEMENTS: 'rod-achievements',
};
