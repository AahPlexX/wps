> Repository: `AahPlexX/wps`  
> Authority: `origin/main`  
> Documentation schema: `wps-v1`

# Development sources

Political-data baseline review: 2026-10-20. Targeted high-risk freshness audit: 2026-10-25. Myanmar was refreshed from current CIA/UN/Reuters evidence in release 1.0.7; this does not claim a new full 195-state review date. Frontend standards reviewed through 2026-10-24.

## Political and diplomatic reference

- CIA World Leaders: weekly-updated foreign-government directory used to cross-check current leadership structures and unusual executive arrangements.
- United Nations Protocol and Liaison Service: heads-of-state and heads-of-government records used for diplomatic cross-checking.
- United Nations country/security records: used for conflict-affected and transitional arrangements where ordinary constitutional descriptions are incomplete.
- 2026-10-25 Myanmar refresh — CIA World Leaders, Burma (last updated 2026-10-13): https://www.cia.gov/resources/world-leaders/foreign-governments/burma — current roster lists President Min Aung Hlaing, two Vice Presidents, no Prime Minister, and notes that the regime is not formally recognized by the U.S. Government.
- 2026-10-25 Myanmar refresh — UN Special Envoy on Myanmar, 2026 General Assembly briefing: https://dppa.un.org/en/node/135995 — reports that the military legislature elected Min Aung Hlaing as political leader after the 2026 polls, that he gave up the Commander-in-Chief role, and that the outcome entrenched rather than ended military dominance.
- 2026-10-25 Myanmar refresh — Reuters, 2026-04-03: https://www.reuters.com/world/asia-pacific/myanmars-junta-chief-set-parliamentary-vote-presidential-bid-2026-04-03/ — independently reports Min Aung Hlaing's election as President and a successor as armed-forces commander.

## Frontend and deployment

- React official documentation and npm registry: React / React DOM 19.3.0 and `createRoot` client API.
- Vite official documentation and npm registry: Vite 8.3.4, Node compatibility, project-site `base: '/wps/'`, GitHub Pages Actions deployment, and the Vite 8 `build.target` default `baseline-widely-available` browser set. https://vite.dev/config/build-options.html#build-target
- Tailwind CSS official documentation and npm registry: Tailwind CSS and `@tailwindcss/vite` 4.3.3 with the Vite plugin integration.
- TypeScript npm registry: TypeScript 7.0.2.
- GitHub Docs: project Pages URL format and Actions-based publishing.
- W3C WCAG 2.2 Reflow understanding: 320 CSS px for vertical-scrolling content and 256 CSS px height for horizontal-scrolling content, with two-dimensional exceptions such as maps and data tables. https://www.w3.org/WAI/WCAG22/Understanding/reflow.html
- W3C WCAG 2.2: focus visibility and minimum pointer target guidance.
- MDN viewport meta reference: preserve zoom, and pair `viewport-fit=cover` with safe-area environment values. https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/viewport
- MDN CSS `env()` reference: safe-area inset environment variables for viewport-edge protection. https://developer.mozilla.org/en-US/docs/Web/CSS/env
- MDN CSS font sizing and `text-size-adjust`: relative sizing/user text preferences and mobile text adjustment behavior.
- MDN: pointer events and Canvas accessibility guidance; significant canvas information has semantic HTML backing.
- 2026-10-23 — W3C WAI-ARIA Authoring Practices Guide, Combobox Pattern and editable combobox examples: popup descendants are excluded from the page Tab sequence, and DOM focus remains on the combobox when `aria-activedescendant` represents visual focus in a listbox. https://www.w3.org/WAI/ARIA/apg/patterns/combobox/

No external source URL or citation is rendered by the public site.
