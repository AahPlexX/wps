> Repository: `AahPlexX/wps`  
> Authority: `origin/main`  
> Documentation schema: `wps-v1`

# Active tasks

Task statuses use the values defined in `docs/DOCUMENTATION.md`.

## Resume here

Current state: WPS-001 through WPS-024 are verified; WPS-T013 is complete and release 1.0.7 is deployed. The targeted high-risk audit and Myanmar correction are fully evidenced without claiming a new full 195-state review date.  
Next action: preserve the current source/version/responsive governance for future work; next significant release is 1.0.8.  
Blockers: none.

| Task | Status | Covers | Completion evidence |
| --- | --- | --- | --- |
| WPS-T001 Establish repo governance and source-of-truth docs | verified | WPS-015 | `AGENTS.md`, PRD, documentation standard, tracker, tasks, decisions, sources, and design records resolve on `main`. |
| WPS-T002 Migrate 195-country directory to React + shared JSON | verified | WPS-001–005, WPS-013 | Pages run `39680561196` validation/build + live directory interaction and three-width QA. |
| WPS-T003 Migrate 3D globe to React without duplicate political data | verified | WPS-006–009, WPS-012 | Globe tests + live UAE/reset interaction + three-width map QA. |
| WPS-T004 Preserve and document responsive accessible visual system | verified | WPS-010, WPS-016 | `DESIGN.md` + live screenshots and 390px overflow measurements. |
| WPS-T005 Configure GitHub Pages deployment | verified | WPS-014 | Pages enabled with workflow build type; run `39680561196` build/deploy succeeded and live routes render. |
| WPS-T006 Reconcile final evidence and handoff state | verified | WPS-015 | Re-read governing records; only `main` exists, open PR inventory is empty, and post-documentation run `39681845777` passed build and deployment steps. |
| WPS-T007 Add map country starts-with typeahead | verified | WPS-017 | Red run `39683845722`; final validation/deploy run `39684424181`; live one/two-character filtering, keyboard/pointer selection, URL state, and 390px overflow checks passed. |
| WPS-T008 Add deployment update prompt and release-version contract | verified | WPS-018–019 | Release 1.0.1 package/lock/build manifest synchronized; red run `39693354911`; Pages run `39694159614` passed validation/build/deploy; live same/newer-version, Cancel/later-version, and centered 390/1920 layout checks passed. |
| WPS-T009 Repair browser history for URL-backed state | verified | WPS-020 | Red run `39959077809`; green Pages run `39959315276` with 10/10 tests and successful deploy; live directory/search/map Back/Forward checks and 390/1366/1920 overflow checks passed at version 1.0.2. |
| WPS-T010 Repair WCAG landmarks, ARIA naming, and 200% reflow | verified | WPS-021 | Red scans `2f2c3199-862b-438c-9347-7f9b11c20bbd` / `45db3587-8a8e-4e30-ad7c-0e477b647605`; Pages run `40037514768` passed validation/build/deploy at 1.0.3; green scans `2fe619f9-4c37-4c0b-8b09-c8d9e78a894e` / `e3ea0cf1-388e-424c-9946-3cb36635dfb8` reported 0 failures; live 720px document width was 720/720 with table overflow scoped at 677/1050, and 390/1920 guard checks had no page overflow. |
| WPS-T011 Keep typeahead popup out of the page Tab sequence | verified | WPS-022 | Red live 1.0.3 audit showed three `J` options at `tabIndex=0` and focus loss on option focus. Pages run `40038450586` passed validation/build/deploy at 1.0.4. Green desktop QA showed all options at -1, `Show country` as the next sequential target, input focus retained through ArrowDown, and Jamaica committed through Enter; 390px pointer QA committed Japan, retained input focus, and had no page overflow. |
| WPS-T012 Apply repository-wide responsive UI contract and repair audited failures | verified | WPS-023 | Governance/spec/plan are permanent; 1.0.5 fixed the original map 320px + 200% overflow/overlay issue, and verification exposed the stacked-directory zero-width value track. The root-cause 1.0.6 correction deployed in Pages run `40152592492`, whose validation gate passed 195-record/map invariants, 10/10 tests, TypeScript, and Vite. The restarted live matrix passed 320px + 200% record/map reflow, scoped table overflow, 640/820/1080 boundaries, 720px reflow, wide/landscape/256px-height layouts, short-height/large-text dialog behavior, RTL/long-content, keyboard, and touch selection. Final route scans reported 0 failures; real nonzero cutout/foldable hardware, real virtual-keyboard behavior, and manual screen-reader listening remain explicitly unverified rather than assumed. |
| WPS-T013 Refresh Myanmar's post-2026 political structure | verified | WPS-024 | Red run `40253196541` failed only on the intended stale Myanmar classification. Green run `40253402693` on `f3c099642dc3622b37a3edaba50e8f75901b4836` passed 195-record/map/category validation, 29 point targets, 11/11 tests, TypeScript/Vite build, and deployment at 1.0.7. Live directory/map checks proved the shared Myanmar record, corrected 142/3 affected category totals, 390px and 1366px containment, and live version 1.0.7. Only `main` exists and open PR inventory is empty. |
