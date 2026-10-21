> Repository: `AahPlexX/wps`  
> Authority: `origin/main`  
> Documentation schema: `wps-v1`

# Decision log

Newest first. One decision fact per line.

- 2026-10-20 — Use two Vite HTML entry points (`index.html` and `map/index.html`) instead of a client router so GitHub Pages deep links work without SPA fallback configuration.
- 2026-10-20 — Keep political facts in the shared `src/data/countries/*.json` dataset; both surfaces consume it through `src/data/index.ts`.
- 2026-10-20 — Keep map geometry in `src/data/mapFeatures/*.json` and aggregate it through `src/data/index.ts`; 166 states use simplified polygons and 29 use geographic point targets because the 1:110m source has no polygon for them.
- 2026-10-20 — Keep the dependency-free Canvas 2D orthographic globe instead of adding a 3D library because the existing projection and interaction satisfy the requested globe behavior with less runtime weight.
- 2026-10-20 — Preserve the standalone constitutional-field-guide visual identity; the repository conversion is not a redesign.
- 2026-10-20 — Use exact top-level package versions and Node 22.16.0 as the build baseline.
- 2026-10-20 — Keep external research provenance in repository documentation and out of the public client.
