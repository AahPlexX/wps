> Repository: `AahPlexX/wps`  
> Authority: `origin/main`  
> Documentation schema: `wps-v1`

# Requirement tracker

Status values: `planned`, `in_progress`, `blocked`, `verified`, `prohibited`.

## Resume here

Current state: WPS-001 through WPS-019 are verified. WPS-020 is in progress because live browser audit on 2026-10-23 proved directory and map URL changes overwrite the current history entry instead of creating a navigable state.  
Next action: execute WPS-T009 with a recorded red→green regression cycle, release the significant repair as 1.0.2, then live-verify Back/Forward on both routes.  
Blockers: none.

| ID | Status | Evidence / next evidence |
| --- | --- | --- |
| WPS-001 | verified | Pages run `39680561196`: `validate:data` confirmed 195 political records and 195 map targets. |
| WPS-002 | verified | Live directory screenshots at 390×844, 1366×900, and 1920×1080; live Monarch interaction rendered 42 countries. |
| WPS-003 | verified | Six-test CI suite includes directory URL-state round-trip; live Monarch interaction resolved `?category=Monarch`. |
| WPS-004 | verified | Six-test CI suite confirms deterministic alphabetical grouping; live Monarch result lists the 42-state group. |
| WPS-005 | verified | Live 390px DOM measurement: `clientWidth=390`, `scrollWidth=390`, 195 rendered country rows. |
| WPS-006 | verified | `GlobeCanvas.tsx` + globe tests + live map renders at 390×844, 1366×900, and 1920×1080; reset interaction verified on the deployed globe. |
| WPS-007 | verified | Live UAE deep link rendered the shared political detail; Reset preserved `?country=United+Arab+Emirates` and the UAE selection. |
| WPS-008 | verified | Pages run `39680561196`: validation confirmed 195 map targets including 29 point-target microstates. |
| WPS-009 | verified | Live map exposes country search plus semantic country detail outside the canvas; UAE detail was retrievable as rendered HTML. |
| WPS-010 | verified | Semantic controls/landmarks and focus/reduced-motion styles are in source; live mobile/desktop renders completed without clipped required content. |
| WPS-011 | verified | Live 390px DOM measurements found zero cross-origin links on both directory and map. |
| WPS-012 | verified | Production build uses local JSON and the Canvas 2D globe; `package.json` contains no runtime visualization/network-data dependency. |
| WPS-013 | verified | `package-lock.json` is committed; Pages run `39680561196` passed `npm ci`, TypeScript, tests, and Vite 8.3.4 production build. |
| WPS-014 | verified | GitHub Pages uses the workflow build type; Pages run `39680561196` build and deploy jobs succeeded; live routes render. |
| WPS-015 | verified | Reconciled records are current on `main`; project handoff sources identify verified requirements, decisions, active version policy, and next-step constraints. |
| WPS-016 | verified | Established constitutional-field-guide system is documented in `DESIGN.md`; live screenshots were reviewed at 390, 1366, and 1920 widths with no material redesign drift found. |
| WPS-017 | verified | Red recorded in run `39683845722`; final run `39684424181` passed validation/build/deploy. Live QA proved `J` => Jamaica/Japan/Jordan, `Ja` => Jamaica/Japan, keyboard selection => Jamaica + `?country=Jamaica`, pointer selection => Japan + `?country=Japan`, and no 390px horizontal overflow. |
| WPS-018 | verified | Red run `39693354911` failed only because `src/lib/version.ts` was absent; all eight tests then passed. Pages run `39694159614` passed validation/build/deploy. Live directory QA proved real 1.0.1 stays silent, synthetic 1.0.2 opens with exactly Update/Cancel, Cancel session-dismisses 1.0.2, and synthetic 1.0.3 prompts afterward. Live map QA proved the same modal at 390px with no horizontal overflow; post-fix modal bounds were centered at x=16/width=358 on 390px and x=720/width=480 on 1920px. |
| WPS-019 | verified | `package.json` and lockfile are synchronized at 1.0.1; Vite embeds that package version as `__APP_VERSION__` and emits the same live `/wps/version.json`; `AGENTS.md` permanently requires +0.0.1 for each future significant release. |
| WPS-020 | in_progress | Live 2026-10-23 audit: directory Monarch selection changed the URL while `history.length` stayed 2→2; map United States→Japan likewise stayed 2→2. Source inspection found both flows use `history.replaceState`. Next evidence: red→green history-policy tests, 1.0.2 validation/deploy, and live Back/Forward verification. |
