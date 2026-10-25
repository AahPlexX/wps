> Repository: `AahPlexX/wps`  
> Authority: `origin/main`  
> Documentation schema: `wps-v1`

# Requirement tracker

Status values are defined in `docs/DOCUMENTATION.md`.

## Resume here

Current state: WPS-001 through WPS-022 are verified; WPS-023 is in progress with the responsive source repair and release metadata prepared at 1.0.5.  
Next action: require the full 1.0.5 validation/deploy gate, then repeat the live responsive matrix with the original 320px + 200%-text map failure as the primary green check.  
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
| WPS-019 | verified | Release 1.0.1 established the package-version/build-manifest contract. The repository `package.json` and lockfile are synchronized at 1.0.5 for WPS-023; the last verified live `/wps/version.json` before deployment reports 1.0.4, and `AGENTS.md` permanently requires +0.0.1 for each future significant release. |
| WPS-020 | verified | Baseline live audit proved directory Monarch selection and map United States→Japan each stayed at history length 2→2. Red run `39959077809` failed only on the intentionally absent history helper. Green Pages run `39959315276` passed 195-record validation, all 10 tests, TypeScript/Vite build, and deployment at 1.0.2. Live QA then proved directory Monarch selection 2→3 with Back/Forward restoring 195↔42 results; `m`→`mo`→`mon` search stayed at one added entry and Back restored the empty 195-country state; map United States→Japan 2→3 with Back/Forward restoring URL, input, and detail. Browser captures at 390, 1366, and 1920px had no horizontal overflow, and live `/wps/version.json` reported 1.0.2. |
| WPS-021 | verified | Red scans `2f2c3199-862b-438c-9347-7f9b11c20bbd` and `45db3587-8a8e-4e30-ad7c-0e477b647605` identified the landmark/ARIA failures and directory 200%-zoom overflow; the baseline 720px probe measured document `scrollWidth=1072`. Pages run `40037514768` then passed 195-record/map validation, all 10 tests, TypeScript/Vite build, and deployment at 1.0.3. Post-release scans `2fe619f9-4c37-4c0b-8b09-c8d9e78a894e` and `e3ea0cf1-388e-424c-9946-3cb36635dfb8` each reported 0 failures and 0 instances. The 720px live probe measured document `clientWidth=720` / `scrollWidth=720` while `.table-wrap` remained independently scrollable at 677px client / 1050px scroll; 390px directory/map and 1920px map checks also had no page-level horizontal overflow, and the live manifest reported 1.0.3. |
| WPS-022 | verified | Current WAI-ARIA APG guidance excludes combobox popup descendants from the page Tab sequence and keeps DOM focus on the combobox when `aria-activedescendant` represents option focus. Red live 1.0.3 audit found Jamaica/Japan/Jordan at `tabIndex=0` and showed focus entering Jamaica closed the popup and dropped focus to `body`. Pages run `40038450586` passed 195-record/map validation, all 10 tests, TypeScript/Vite build, and deployment at 1.0.4. Live 1.0.4 desktop QA found all three `J` options at `tabIndex=-1`, the next sequential target was `Show country`, ArrowDown kept DOM focus on the input while `aria-activedescendant` moved to Jamaica, and Enter selected Jamaica with matching URL/input/detail. Separate 390px pointer QA selected Japan with matching URL/input/detail, retained combobox focus, and measured `clientWidth=scrollWidth=390`; the live manifest reported 1.0.4. |
| WPS-023 | in_progress | Pre-fix live audit supplies the behavioral red test. Directory and map each stayed page-width-contained at 320px; directory and map each stayed contained at 1280px with root text doubled to 32px; directory also stayed 320/320 at 320px + 200% text; map at 1024×256 remained 1024/1024 with reachable normal-flow controls; RTL plus a long synthetic brand stayed 390/390. The update-dialog stress case at 320×256 + 200% text retained internal scrolling. The combined map case at 320px + 200% text failed: document `scrollWidth=339` for a 320px client because `.directory-link`/title intrinsic width exceeded the shell, and `.map-status` grew to 589px inside a 464px overflow-hidden globe stage. No browser-layout test dependency is added solely for this CSS behavior. Source repair now makes globe instructions independently flowable, removes the non-wrapping directory-link constraint, protects physical safe-area edges in shared shells/dialog geometry, and uses logical directional presentation where appropriate; next evidence is the 1.0.5 `npm run validate`/deploy gate and repeat live red→green matrix. |
