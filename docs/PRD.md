> Repository: `AahPlexX/wps`  
> Authority: `origin/main`  
> Documentation schema: `wps-v1`

# Product requirements

## Product scope

World Political Structures is a GitHub Pages reference site at `aahplexx.github.io/wps`. It converts the validated standalone political-structure directory and 3D globe into a maintainable Vite + TypeScript + React + Tailwind CSS application with JSON-backed data.

## Requirements

| ID | Requirement | Acceptance test |
| --- | --- | --- |
| WPS-001 | The political dataset contains exactly 195 unique sovereign-state records in one shared JSON source. | `npm run validate:data` proves 195 unique records with the complete schema. |
| WPS-002 | The homepage provides a searchable, filterable directory of all country records. | Search, assignment, structure, and grouping controls update visible results from the shared dataset. |
| WPS-003 | Directory state is deep-linkable. | Search/filter/group state round-trips through URL query parameters and back/forward navigation. |
| WPS-004 | Countries are alphabetical within each visible group and political-assignment groups use the defined order. | Focused unit test proves deterministic grouping and alphabetical order. |
| WPS-005 | The directory reflows without horizontal page overflow on phones while preserving all four data fields. | Browser QA at 390px shows country records with country, top office, structure, and hierarchy present. |
| WPS-006 | A separate `/wps/map/` page provides an interactive 3D orthographic world globe. | Pointer drag, wheel zoom, keyboard rotation/zoom, reset, country search, and country selection work in browser QA. |
| WPS-007 | Selecting a map country shows the same political facts used by the directory and deep-links the selected country. | Country detail is read from `src/data/countries/*.json`; `?country=` selects and restores the same state. |
| WPS-008 | All 195 states remain selectable on the globe even when 1:110m source geometry omits a visible polygon. | `npm run validate:data` proves 195 map targets and exactly 29 point targets for polygon-absent small states. |
| WPS-009 | Canvas interaction has an accessible HTML equivalent. | Country search and semantic HTML details expose the selected data without requiring canvas perception or pointer input. |
| WPS-010 | The UI follows WCAG 2.2 AA interaction basics: visible focus, semantic controls, minimum target sizing, skip links, zoom support, reduced-motion handling, and no focus-obscuring overlays. | Browser/accessibility review plus stylesheet/markup inspection passes. |
| WPS-011 | Public pages contain no external source links or citation UI. | Production DOM/link audit finds only internal navigation. |
| WPS-012 | The client has no external runtime data or visualization dependency. | Production bundle uses local JSON and Canvas 2D; network-independent render succeeds after assets load. |
| WPS-013 | The implementation uses Vite, TypeScript, JSON, React, and Tailwind CSS with exact top-level package versions. | `package.json`, lockfile, and production build prove the stack. |
| WPS-014 | GitHub Pages builds from `main` with Vite base `/wps/`. | Deployment workflow builds `dist`, publishes the Pages artifact, and the live `/wps/` and `/wps/map/` routes load. |
| WPS-015 | Repository documentation stays resumable at every stop. | `TRACKER.md` and `TASKS.md` contain current “Resume here” entries and fresh evidence. |
| WPS-016 | The established constitutional-field-guide visual system is preserved across directory and map surfaces. | `DESIGN.md` tokens match the implemented palette/type/layout and browser screenshots show one coherent system. |
| WPS-017 | The map country search provides an accessible starts-with typeahead from the first typed character. | Focused matcher test passes; browser QA proves one-character live filtering, keyboard/pointer selection, and preserved `?country=` deep-link behavior. |
