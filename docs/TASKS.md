> Repository: `AahPlexX/wps`  
> Authority: `origin/main`  
> Documentation schema: `wps-v1`

# Active tasks

Task statuses use the values defined in `docs/TRACKER.md`.

## Resume here

Current state: WPS-001 through WPS-019 are verified and release 1.0.1 is deployed. The generated version manifest and root-mounted update prompt are live on both directory and map routes.  
Next action: future significant updates must increment the package patch version exactly once before deployment; otherwise begin from the PRD/tracker/decisions and verify source freshness before political-data changes.  
Blockers: none.

| Task | Status | Covers | Completion evidence |
| --- | --- | --- | --- |
| WPS-T001 Establish repo governance and source-of-truth docs | verified | WPS-015 | `AGENTS.md`, PRD, tracker, tasks, decisions, sources, product, and design records resolve on `main`. |
| WPS-T002 Migrate 195-country directory to React + shared JSON | verified | WPS-001–005, WPS-013 | Pages run `39680561196` validation/build + live directory interaction and three-width QA. |
| WPS-T003 Migrate 3D globe to React without duplicate political data | verified | WPS-006–009, WPS-012 | Globe tests + live UAE/reset interaction + three-width map QA. |
| WPS-T004 Preserve and document responsive accessible visual system | verified | WPS-010, WPS-016 | `DESIGN.md` + live screenshots and 390px overflow measurements. |
| WPS-T005 Configure GitHub Pages deployment | verified | WPS-014 | Pages enabled with workflow build type; run `39680561196` build/deploy succeeded and live routes render. |
| WPS-T006 Reconcile final evidence and handoff state | verified | WPS-015 | Re-read governing records; only `main` exists, open PR inventory is empty, and post-documentation run `39681845777` passed build and deployment steps. |
| WPS-T007 Add map country starts-with typeahead | verified | WPS-017 | Red run `39683845722`; final validation/deploy run `39684424181`; live one/two-character filtering, keyboard/pointer selection, URL state, and 390px overflow checks passed. |
| WPS-T008 Add deployment update prompt and release-version contract | verified | WPS-018–019 | Release 1.0.1 package/lock/build manifest synchronized; red run `39693354911`; Pages run `39694159614` passed validation/build/deploy; live same/newer-version, Cancel/later-version, and centered 390/1920 layout checks passed. |
