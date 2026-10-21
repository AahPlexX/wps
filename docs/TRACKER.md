> Repository: `AahPlexX/wps`  
> Authority: `origin/main`  
> Documentation schema: `wps-v1`

# Requirement tracker

Status values: `planned`, `in_progress`, `blocked`, `verified`, `prohibited`.

## Resume here

Current state: WPS-001 through WPS-017 are verified. WPS-018 and WPS-019 are in progress to add client-side redeploy detection, an Update/Cancel modal, and mandatory patch-version releases beginning from baseline 1.0.0.  
Next action: complete WPS-T008 by establishing the 1.0.1 version manifest contract, then wire and live-verify the update prompt on both routes.  
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
| WPS-015 | verified | Reconciled records were re-read on `main`; branch inventory contained only `main`, open PR inventory was empty, and post-documentation Pages run `39681845777` passed build and deployment steps. |
| WPS-016 | verified | Established constitutional-field-guide system is documented in `DESIGN.md`; live screenshots were reviewed at 390, 1366, and 1920 widths with no material redesign drift found. |
| WPS-017 | verified | Red recorded in run `39683845722`; final run `39684424181` passed validation/build/deploy. Live QA proved `J` => Jamaica/Japan/Jordan, `Ja` => Jamaica/Japan, keyboard selection => Jamaica + `?country=Jamaica`, pointer selection => Japan + `?country=Japan`, and no 390px horizontal overflow. |
| WPS-018 | in_progress | Next evidence: version comparator red→green, deployed `version.json`, synthetic newer-version browser QA on both routes, Update/Cancel behavior, session dismissal, and mobile overflow check. |
| WPS-019 | in_progress | Baseline `package.json` is 1.0.0. This significant update must release as 1.0.1 with package/lock/build manifest values synchronized and the permanent increment rule recorded in `AGENTS.md`. |
