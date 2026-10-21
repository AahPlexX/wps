> Repository: `AahPlexX/wps`  
> Authority: `origin/main`  
> Documentation schema: `wps-v1`

# Deployment Update Prompt Implementation Plan

> **For agentic workers:** Use the host's available task-by-task implementation workflow. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Notify already-open WPS clients when a newer deployment is available and establish `package.json` as the authoritative release version, beginning from 1.0.0 and incrementing significant releases by one patch.

**Architecture:** Read the release version once from `package.json` in Vite configuration, inject it into the client as `__APP_VERSION__`, and emit the same value as `dist/version.json`. A top-level React prompt checks that marker without cache on mount, every five minutes, and when the window regains focus; when the remote version is newer it opens a native accessible dialog showing only the available version and Update/Cancel actions.

**Tech Stack:** React 19.3.0, TypeScript 7.0.2, Vite 8.3.4, existing CSS design tokens, Node built-in test runner, GitHub Pages.

## Global Constraints

- `package.json` is the single authoritative application version.
- Versioning officially starts at `1.0.0`; every significant product update increments only the patch component by exactly one (`+0.0.1`).
- This feature is a significant update and therefore releases as `1.0.1`.
- The build must embed the package version in the client and publish the identical version in `/wps/version.json`; no duplicate hand-maintained version constant is allowed.
- The client checks for a newer deployment on initial mount, every five minutes while open, and whenever the window regains focus.
- Version checks use a cache-busting request with `cache: 'no-store'`; network, parse, or invalid-version failures are silent and must not disrupt the application.
- A newer published version opens an accessible modal displaying `Version <available-version> is now available.` and exactly two actions: `Update` and `Cancel`; no change description is shown.
- `Update` reloads the current page so the new deployment can load.
- `Cancel` closes the modal and suppresses only that exact offered version for the current browser tab/session; a later version may prompt again.
- The prompt must work on both directory and map routes because it is mounted at the application root.
- Add no runtime dependency and preserve the constitutional-field-guide visual system.

---

### Task 1: Establish authoritative versioning and build manifest

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `vite.config.ts`
- Modify: `src/vite-env.d.ts`
- Modify: `src/lib/version.ts` (existing library area; create if absent)
- Create: `tests/version.test.ts`
- Modify: `AGENTS.md`

**Interfaces:**
- Consumes: `package.json.version`.
- Produces: global compile-time string `__APP_VERSION__`; emitted `dist/version.json` payload `{ "version": "<package-version>" }`; `isNewerVersion(available: string, current: string): boolean`.

- [ ] **Step 1: Add the focused failing test**

Create `tests/version.test.ts` asserting `isNewerVersion('1.0.1', '1.0.0') === true`, equality is false, an older remote version is false, a higher minor/major is true, and malformed versions return false rather than throwing.

- [ ] **Step 2: Verify the relevant failure**

Run: `npm test`
Expected: the new version test fails because `src/lib/version.ts` / `isNewerVersion` does not yet exist.

- [ ] **Step 3: Implement the minimum behavior**

Add a numeric three-part dotted-version parser and comparator in `src/lib/version.ts`. Bump `package.json` and the root package entries in `package-lock.json` from `1.0.0` to `1.0.1`. In `vite.config.ts`, read `package.json` once, define `__APP_VERSION__` from that value, and add a local Vite plugin whose `generateBundle` emits `version.json` from the same value. Declare `__APP_VERSION__` in `src/vite-env.d.ts`. Add the permanent patch-increment rule to `AGENTS.md`.

- [ ] **Step 4: Verify the focused pass**

Run: `npm test`
Expected: all existing tests plus version comparison tests pass.

- [ ] **Step 5: Run the affected integration check**

Run: `npm run build`
Expected: TypeScript/Vite succeed and `dist/version.json` contains exactly `{ "version": "1.0.1" }` while the built client compiles with `__APP_VERSION__ = "1.0.1"`.

- [ ] **Step 6: Commit the passing deliverable**

Commit version helper/tests, package/lock version bump, Vite manifest emission, ambient type, and repository versioning instruction together.

### Task 2: Add the client deployment-update modal

**Files:**
- Create: `src/components/DeploymentUpdatePrompt.tsx`
- Modify: `src/App.tsx`
- Modify: `src/styles.css`
- Modify: `DESIGN.md`
- Modify: `docs/PRD.md`
- Modify: `docs/TRACKER.md`
- Modify: `docs/TASKS.md`
- Modify: `docs/DECISIONS.md`

**Interfaces:**
- Consumes: `__APP_VERSION__`, `${import.meta.env.BASE_URL}version.json`, `isNewerVersion`, `sessionStorage`, browser `focus` events, and a five-minute interval.
- Produces: a native `<dialog>` modal with the available version, `Update`, and `Cancel`.

- [ ] **Step 1: Add the focused failing test**

The pure version comparison contract from Task 1 is the deterministic non-DOM regression boundary. Browser QA will exercise the prompt by replacing `window.fetch` after load, dispatching a focus event, and returning a synthetic higher version so no production-only debug seam is added.

- [ ] **Step 2: Verify the relevant failure**

Before implementation, `App.tsx` has no deployment-version checker or update dialog; a synthetic higher manifest therefore cannot produce the requested prompt.

- [ ] **Step 3: Implement the minimum behavior**

Mount `DeploymentUpdatePrompt` once beside the active route in `App`. On mount, focus, and five-minute interval, request `version.json` with a timestamp query and `cache: 'no-store'`; if its version is valid, newer than `__APP_VERSION__`, and not equal to `sessionStorage['wps-dismissed-version']`, call `dialog.showModal()`. `Cancel` writes the offered version to that session key and closes the dialog. `Update` calls `window.location.reload()`. Ignore failed requests, non-OK responses, invalid JSON, and invalid versions. Prevent native Escape cancellation from leaving state inconsistent by routing the dialog `cancel` event through the same Cancel behavior.

- [ ] **Step 4: Verify the focused pass**

Run: `npm test`
Expected: all existing and version tests pass.

- [ ] **Step 5: Run the affected integration check**

Run: `npm run validate`, then browser-check both `/wps/` and `/wps/map/`. Using a post-load fetch mock plus a focus event, return `1.0.2` and verify the modal reads `Version 1.0.2 is now available.`, contains only `Update` and `Cancel`, Cancel closes and suppresses 1.0.2 for the same session, and a later mocked `1.0.3` can prompt. Verify mobile 390px has no horizontal overflow and the real deployed `/wps/version.json` reports `1.0.1` without showing a modal to a 1.0.1 client.

- [ ] **Step 6: Commit the passing deliverable**

Commit the prompt, root integration, styling, and reconciled source-of-truth documentation together.

## Unresolved product decisions

None. The owner specified the modal actions, visible version, no update description, and mandatory patch-version cadence; session-only suppression for Cancel and five-minute-plus-focus checking are bounded implementation choices that preserve those requirements without adding scope.
