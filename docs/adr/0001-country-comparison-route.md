> Repository: `AahPlexX/wps`  
> Authority: `origin/main`  
> Documentation schema: `wps-v1`

# ADR-001: Dedicated country comparison route

- Status: accepted
- Date: 2026-10-26
- Requirement: WPS-026

## Context

WPS already normalizes the same political fields across 195 states and describes itself as a comparison reference, but the directory requires readers to scan separate rows and the globe is intentionally optimized for one-country geographic exploration. The next client addition should make those existing facts directly comparable without adding data, accounts, persistence, external services, or a new routing dependency.

## Decision

Add `/wps/compare/` as a third Vite HTML entry point served by the existing React application. The page accepts zero to four valid, unique country selections and encodes committed selection order as repeated `country=` query parameters. Unknown and duplicate parameters are ignored and only the first four unique valid countries are restored. One-country URLs are valid prefills; comparison content becomes meaningful at two or more selections.

The page reuses the shared `src/data/countries/*.json` records, `CountryTypeahead`, `CountryDetail`, `SiteHeader`, existing design tokens, and browser History API. No new runtime dependency, router, data source, persistence layer, collaboration feature, export workflow, or public citation UI is introduced.

## Alternatives considered

### Inline comparison tray in the directory

Rejected because it mixes persistent selection state into an already dense filtering surface, complicates directory history semantics, and makes responsive behavior harder without improving the dedicated comparison task.

### Comparison mode on the globe

Rejected because the globe's current job is geographic discovery plus one-country detail. Multi-country comparison would dilute that interaction and make canvas state unnecessarily coupled to reference content.

### Dedicated comparison route

Accepted because it keeps each surface single-purpose, matches the existing static multi-entry GitHub Pages architecture, supports direct deep links, and can reuse existing data and interaction primitives with a small reversible diff.

## Consequences

- `vite.config.ts` gains `compare/index.html` as a build input.
- `App.tsx` recognizes `/compare` without introducing a router.
- Primary navigation gains `Compare`; the shared narrow-header layout must continue to reflow without page overflow.
- Comparison URL-state logic is isolated in a focused pure helper and covered by Node tests.
- Significant release version advances from 1.0.8 to 1.0.9 only when the implementation is green.
