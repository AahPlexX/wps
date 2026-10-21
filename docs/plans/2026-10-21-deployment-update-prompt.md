> Repository: `AahPlexX/wps`  
> Authority: `origin/main`  
> Documentation schema: `wps-v1`

# Deployment Update Prompt Implementation Plan

> **For agentic workers:** This plan is complete. Steps use checkbox syntax to preserve execution evidence.

**Goal:** Notify already-open WPS clients when a newer deployment is available and establish `package.json` as the authoritative release version, beginning from 1.0.0 and incrementing significant releases by one patch.

**Architecture:** Read the release version once from `package.json` in Vite configuration, inject it into the client as `__APP_VERSION__`, and emit the same value as `dist/version.json`. A top-level React prompt checks that marker without cache on mount, every five minutes, and when the window regains focus; when the remote version is newer it opens a native accessible dialog showing only the available version and Update/Cancel actions.

**Tech Stack:** React 19.3.0, TypeScript 7.0.2, Vite 8.3.4, existing CSS design tokens, Node built-in test runner, GitHub Pages.

## Global Constraints

- `package.json` is the single authoritative application version.
- Versioning officially starts at `1.0.0`; every significant product update increments only the patch component by exactly one (`+0.0.1`).
- This feature is a significant update and therefore releases as `1.0.1`.
- The build embeds the package version in the client and publishes the identical version in `/wps/version.json`; no duplicate hand-maintained version constant exists.
- The client checks for a newer deployment on initial mount, every five minutes while open, and whenever the window regains focus.
- Version checks use a cache-busting request with `cache: 'no-store'`; network, parse, or invalid-version failures are silent and do not disrupt the application.
- A newer published version opens an accessible modal displaying `Version <available-version> is now available.` and exactly two actions: `Update` and `Cancel`; no change description is shown.
- `Update` reloads the current page so the new deployment can load.
- `Cancel` closes the modal and suppresses only that exact offered version for the current browser tab/session; a later version may prompt again.
- The prompt works on both directory and map routes because it is mounted at the application root.
- No runtime dependency was added and the constitutional-field-guide visual system is preserved.

---

### Task 1: Establish authoritative versioning and build manifest

**Files:** `package.json`, `package-lock.json`, `vite.config.ts`, `tsconfig.node.json`, `src/vite-env.d.ts`, `src/lib/version.ts`, `tests/version.test.ts`, `AGENTS.md`.

- [x] Add the focused failing version-comparison test.
- [x] Observe the expected red failure in run `39693354911` because `src/lib/version.ts` was absent while all prior tests remained green.
- [x] Implement strict three-part numeric comparison and synchronize package/lock to 1.0.1.
- [x] Embed `__APP_VERSION__` and emit `version.json` from the same imported package JSON value.
- [x] Keep the build dependency-free by importing package JSON through the Vite config instead of adding Node ambient types.
- [x] Verify all eight tests and the production build in Pages validation.

### Task 2: Add the client deployment-update modal

**Files:** `src/components/DeploymentUpdatePrompt.tsx`, `src/App.tsx`, `src/styles.css`, `DESIGN.md`, `docs/PRD.md`, `docs/TRACKER.md`, `docs/TASKS.md`, `docs/DECISIONS.md`.

- [x] Mount one prompt at the application root for both routes.
- [x] Check the no-store manifest at mount, every five minutes, and on focus.
- [x] Implement native-dialog version display plus Update/Cancel; route Escape through the same Cancel/session-dismiss behavior.
- [x] Verify real 1.0.1 produces no prompt and synthetic 1.0.2 produces exactly Update/Cancel.
- [x] Verify Cancel suppresses 1.0.2 for the session and synthetic 1.0.3 can prompt afterward.
- [x] Verify map-route mobile behavior at 390px with no horizontal overflow.
- [x] Catch and fix browser-dependent default dialog positioning, then verify explicit centering at 390px and 1920px.
- [x] Reconcile the design, decisions, PRD, tracker, tasks, and this plan.

## Completion evidence

- Red: Pages run `39693354911`.
- Validated/deployed runtime and centered-dialog fix: Pages run `39694159614`.
- Live manifest: `1.0.1`.
- Directory synthetic QA: 1.0.2 opened with Update/Cancel; Cancel suppressed 1.0.2; 1.0.3 opened afterward.
- Responsive QA: 390px modal x=16, width=358, page scrollWidth=390; 1920px modal x=720, width=480, page scrollWidth=1920.

## Unresolved product decisions

None.
