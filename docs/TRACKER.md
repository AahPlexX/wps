> Repository: `AahPlexX/wps`  
> Authority: `origin/main`  
> Documentation schema: `wps-v1`

# Requirement tracker

Status values are defined in `docs/DOCUMENTATION.md`.

## Resume here

Current state: WPS-001 through WPS-020 are verified; WPS-021 is in progress with the minimal semantic/reflow repair and repository release metadata now prepared at 1.0.3.  
Next action: require the 1.0.3 validation/deployment gate, then repeat independent accessibility scans and 720px/390px/1920px reflow measurements before marking WPS-021 verified.  
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
| WPS-019 | verified | Release 1.0.1 established the package-version/build-manifest contract. The repository `package.json` and lockfile are synchronized at 1.0.3 for WPS-021; the last verified live manifest before that deployment reported 1.0.2, and `AGENTS.md` permanently requires +0.0.1 for each future significant release. |
| WPS-020 | verified | Baseline live audit proved directory Monarch selection and map United States→Japan each stayed at history length 2→2. Red run `39959077809` failed only on the intentionally absent history helper. Green Pages run `39959315276` passed 195-record validation, all 10 tests, TypeScript/Vite build, and deployment at 1.0.2. Live QA then proved directory Monarch selection 2→3 with Back/Forward restoring 195↔42 results; `m`→`mo`→`mon` search stayed at one added entry and Back restored the empty 195-country state; map United States→Japan 2→3 with Back/Forward restoring URL, input, and detail. Browser captures at 390, 1366, and 1920px had no horizontal overflow, and live `/wps/version.json` reported 1.0.2. |
| WPS-021 | in_progress | Live directory accessibility scan `2f2c3199-862b-438c-9347-7f9b11c20bbd` found duplicate banner landmarks plus page-level horizontal scrolling at 200% zoom. Live map scan `45db3587-8a8e-4e30-ad7c-0e477b647605` found a prohibited `aria-label` on the decorative category swatch and an unlabeled complementary landmark. A 720px browser probe measured document `scrollWidth=1072` and traced the page overflow to `.directory-group` expanding to the table’s 1050px min-content width. Source repair now keeps `SiteHeader` as the sole banner, labels the map detail landmark, hides the redundant color swatch from assistive technology, and constrains `.directory-group` intrinsic width; next evidence is the 1.0.3 validation/deploy plus clean repeat scans and scoped table-overflow measurement. |
