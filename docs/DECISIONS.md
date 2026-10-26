> Repository: `AahPlexX/wps`  
> Authority: `origin/main`  
> Documentation schema: `wps-v1`

# Decision log

Newest first. One decision fact per line.

- 2026-10-26 — Ignore unsupported directory category/structure/group query values at the URL parser boundary rather than exposing synthetic invalid select options or rewriting browser history; free-text search remains unconstrained.
- 2026-10-26 — Treat the malformed-directory-deep-link repair as significant release 1.0.8 because it changes user-visible deep-link behavior; add no dependency, router, or canonicalization subsystem.
- 2026-10-26 — Keep WPS-023 and `docs/RESPONSIVE_UI.md` as the single repository-wide responsive authority; the 2026-10-26 administrative refresh expands that standard without creating a duplicate requirement, breakpoint system, or product release.
- 2026-10-26 — For height-sensitive and emerging viewport features, prefer `min-height`/`svh`, use `dvh` only when dynamic browser chrome matters, and add `interactive-widget`, viewport segments, or container-query behavior only when an evidenced UI need justifies them.
- 2026-10-26 — Future media and large-data UI must remain fluid and semantically complete; existing Tailwind-vs-shared-CSS conventions stay authoritative rather than introducing a parallel styling architecture.
- 2026-10-25 — Represent Myanmar's post-2026 operative structure as a military-backed presidential government: President is the top listed office, the current foreign-government roster lists Vice Presidents and no Prime Minister, and continuing military dominance belongs in the explanatory note rather than an obsolete Commander-in-Chief-first hierarchy.
- 2026-10-25 — Scope the 1.0.7 political-data refresh to the verified Myanmar drift plus resulting category totals; do not add incumbent names to public data, a runtime political API, citation UI, schema changes, or a blanket 195-country rewrite without evidence of additional structural drift.

- 2026-10-24 — Use shrinkable proportional label/value tracks for stacked directory records; a fixed `rem` minimum on the label track collapses the value track under 200% text enlargement at 320px.

- 2026-10-24 — Govern every client-facing WPS surface with `docs/RESPONSIVE_UI.md`; responsive decisions use available space and existing CSS/Tailwind conventions rather than device detection or a new breakpoint framework.
- 2026-10-24 — Treat Vite 8's unoverridden `baseline-widely-available` build target as the repository browser-support baseline: Chrome 111+, Edge 111+, Firefox 114+, Safari 16.4+, and iOS 16.4+.
- 2026-10-24 — Preserve the globe instruction overlay on layouts where it fits, but move its text into normal flow at the existing narrow-layout breakpoint when increased text would otherwise exceed/obscure the globe; do not resize the map merely to hide the text.
- 2026-10-24 — With `viewport-fit=cover`, protect both inline safe-area edges in page shells and prefer logical layout properties for directional UI; retain physical coordinates only where canvas/pointer geometry requires them.
- 2026-10-23 — Keep map typeahead listbox options pointer-activatable but set their native button `tabIndex` to -1 so the `aria-activedescendant` combobox remains the only sequential keyboard focus target while the popup is open.
- 2026-10-23 — Keep `SiteHeader` as the sole page-level banner landmark; the directory hero is content, not a second banner.
- 2026-10-23 — Treat the map detail category-color dot as decorative because the adjacent detail list already exposes the category in text; label the map detail complementary landmark from its country-detail heading.
- 2026-10-23 — Constrain each directory group grid item with `min-width: 0` so the 1050px reference table scrolls inside `.table-wrap` instead of increasing page width at zoomed/intermediate viewports.
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
