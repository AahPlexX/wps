> Repository: `AahPlexX/wps`  
> Authority: `origin/main`  
> Documentation schema: `wps-v1`

# Decision log

Newest first. One decision fact per line.

- 2026-10-23 — User-driven directory filter changes and map country selections create browser-history entries; `popstate` restores application state without writing a new history entry.
- 2026-10-23 — Consecutive directory-search keystrokes within one focus/edit session share one history entry: the first edit pushes and later edits replace until blur or `popstate` ends that edit session.
- 2026-10-21 — Treat `package.json.version` as the application release-version source of truth, beginning at 1.0.0; every significant release increments only the patch by exactly one, and the deployment-update feature releases as 1.0.1.
- 2026-10-21 — Emit `/wps/version.json` from the same package version embedded as `__APP_VERSION__`; clients check it without cache on mount, every five minutes, and on window focus.
- 2026-10-21 — Use a native modal `dialog` for newer-deployment notification; Update reloads the current URL, while Cancel session-dismisses only that offered version so a later version can prompt.
- 2026-10-21 — Replace the map page native country `datalist` with a dependency-free ARIA combobox using locale-aware country-name prefix matching from the first typed character.
- 2026-10-21 — Publish GitHub Pages from the GitHub Actions workflow build type at `https://aahplexx.github.io/wps/`.
- 2026-10-21 — Keep the permanent Pages workflow read-only for repository contents and install exclusively with `npm ci` from the committed lockfile.
- 2026-10-21 — Keep Vite client ambient types in `src/vite-env.d.ts` and explicit non-null DOM/canvas aliases in the globe effect so TypeScript 7 strict checking remains enabled.
- 2026-10-20 — Use two Vite HTML entry points (`index.html` and `map/index.html`) instead of a client router so GitHub Pages deep links work without SPA fallback configuration.
- 2026-10-20 — Keep political facts in the shared `src/data/countries/*.json` dataset; both surfaces consume it through `src/data/index.ts`.
- 2026-10-20 — Keep map geometry in `src/data/mapFeatures/*.json` and aggregate it through `src/data/index.ts`; 166 states use simplified polygons and 29 use geographic point targets because the 1:110m source has no polygon for them.
- 2026-10-20 — Keep the dependency-free Canvas 2D orthographic globe instead of adding a 3D library because the existing projection and interaction satisfy the requested globe behavior with less runtime weight.
- 2026-10-20 — Preserve the standalone constitutional-field-guide visual identity; the repository conversion is not a redesign.
- 2026-10-20 — Use exact top-level package versions and Node 22.16.0 as the build baseline.
- 2026-10-20 — Keep external research provenance in repository documentation and out of the public client.
