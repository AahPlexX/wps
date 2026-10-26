# World Political Structures

Responsive GitHub Pages reference for comparing the top political assignment, government structure, and national political hierarchy of 195 sovereign states. The site has a searchable directory, a separate interactive 3D globe, and a dedicated country-comparison page.

## Live site

- `https://aahplexx.github.io/wps/` â searchable political-structure directory.
- `https://aahplexx.github.io/wps/map/` â interactive orthographic globe and country detail view.

## Stack

Vite + TypeScript + React + Tailwind CSS + JSON. Runtime political and map data are local; the published site has no external runtime dependency or source-link requirement.

## Local commands

- `npm ci` â install the committed dependency graph from `package-lock.json`.
- `npm run dev` â start Vite locally.
- `npm test` â run focused Node tests for directory, comparison, globe, browser-history, typeahead, and deployment-version logic.
- `npm run validate:data` â assert the 195-state dataset and map-target invariants.
- `npm run build` â type-check and create the production build.
- `npm run validate` â run data checks, tests, and production build.

Node 22.16.0 is the repository baseline (`.nvmrc`).

## Routes

- `/wps/` â searchable political-structure directory.
- `/wps/map/` â interactive orthographic globe and country detail view.

## Project records

Read `AGENTS.md` first. Active requirements and handoff state live in `docs/PRD.md`, `docs/TRACKER.md`, `docs/TASKS.md`, and `docs/DECISIONS.md`. `DESIGN.md` is the visual source of truth, and `docs/RESPONSIVE_UI.md` is the permanent adaptive-layout and responsive-verification standard for every client-facing surface.
