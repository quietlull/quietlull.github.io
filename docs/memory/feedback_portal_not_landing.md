---
name: Portal is not the landing page
description: The root index.html (portal) is NOT the main landing page and is low priority — stop treating it as the primary page
type: feedback
---

The portal page (root `/`, layout: portal) is NOT the landing page. The actual landing pages are the section-level pages (`/tech-art/`, `/game-design/`) using the `section-landing` layout. The portal is just a doorway between sections.

**Why:** I keep gravitating toward the portal as if it's the most important page because it's `index.html` / the root URL. The user has explicitly said portal overhaul is LAST priority and gets frustrated when I treat it as the main focus.

**How to apply:** When thinking about "the landing page" or "the main page," always mean the section landing pages, not the portal. When prioritizing work, portal is always last. Don't add features to the portal unless specifically asked.
