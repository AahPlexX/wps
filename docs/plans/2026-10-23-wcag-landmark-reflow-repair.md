# WCAG Landmark and Reflow Repair Implementation Plan

> **For agentic workers:** Use the host's available task-by-task implementation workflow. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the verified WCAG landmark/ARIA failures and prevent page-level horizontal scrolling at 200% zoom while preserving the established WPS visual system and scoped table scrolling.

**Architecture:** Keep the current components and CSS architecture. Repair semantics at the existing markup boundary: `SiteHeader` remains the sole banner, the directory hero becomes a labelled section, the map detail aside is labelled from the existing country heading, and the already-textual category makes the color dot decorative. Repair reflow at the CSS grid boundary with `min-width: 0` on `.directory-group`, allowing `.table-wrap` to own the existing 1050px table overflow.

**Tech Stack:** React 19.3.0, TypeScript 7.0.2, CSS, Tailwind CSS 4.3.3, Vite 8.3.4, Node built-in test runner, GitHub Pages, automated WCAG 2.2 A/AA browser scanning.

## Global Constraints

- Preserve the constitutional-field-guide visual system; this work is not a redesign.
- Preserve all political data, filters, URL state, typeahead behavior, globe interaction, and update-prompt behavior.
- Keep `SiteHeader` as the only page-level banner landmark.
- Keep the map category color visible but hide that decorative swatch from assistive technology because the category text is already present.
- Keep the map country-detail content as a complementary landmark with an accessible name derived from the visible country heading.
- At 200% zoom, the page itself must reflow without horizontal scrolling; the wide data table may retain scoped horizontal scrolling inside `.table-wrap`.
- Add no dependency and do not suppress overflow on `body` or `html`.
- This is a significant accessibility repair and releases as 1.0.3 under the repository patch-version contract.

---

### Task 1: Repair landmark and ARIA semantics

**Files:**
- Modify: `src/pages/HomePage.tsx`
- Modify: `src/pages/MapPage.tsx`
- Modify: `src/components/CountryDetail.tsx`

**Interfaces:**
- Consumes: existing `SiteHeader`, `CountryDetail`, and `country-detail-title` heading ID.
- Produces: one page-level banner on the directory; a labelled map complementary landmark; no prohibited accessible name on the decorative category swatch.

- [x] **Step 1: Preserve the recorded failing behavioral evidence**

Use live scan `2f2c3199-862b-438c-9347-7f9b11c20bbd` as the red directory semantic baseline and scan `45db3587-8a8e-4e30-ad7c-0e477b647605` as the red map semantic baseline. No new unit test is added because this change contains no new logic; the public accessibility scan is the direct behavioral seam.

- [x] **Step 2: Implement the minimum semantic repair**

Change the directory hero wrapper from a top-level `<header>` to `<section aria-labelledby="directory-title">` and give its existing `h1` `id="directory-title"`. In `CountryDetail`, replace the category swatch `aria-label` with `aria-hidden="true"`. On the existing map detail `<aside>`, add `aria-labelledby="country-detail-title"`; keep `aria-live="polite"` unchanged.

- [ ] **Step 3: Run the affected integration check**

Run: `npm run build`
Expected: TypeScript and Vite production build complete with zero errors and unchanged route structure.

### Task 2: Repair 200% zoom reflow at the grid boundary

**Files:**
- Modify: `src/styles.css`

**Interfaces:**
- Consumes: `.directory-sections`, `.directory-group`, `.table-wrap`, and the existing 1050px table minimum width.
- Produces: a shrinkable directory grid item whose wide table scroll remains local to `.table-wrap`.

- [x] **Step 1: Preserve the recorded failing reflow evidence**

Use the live 720px CSS-viewport probe as the red baseline: document `clientWidth=720`, document `scrollWidth=1072`, `.directory-group` width 1050px.

- [x] **Step 2: Implement the minimum CSS repair**

Add `min-width: 0` to `.directory-group`. Do not change the table minimum width, mobile table-to-record reflow breakpoint, global overflow, or category-index scrolling.

- [ ] **Step 3: Verify the focused behavior after deployment**

At a 720px CSS viewport, assert document `scrollWidth <= clientWidth`, `.directory-group` fits the page shell, and `.table-wrap.scrollWidth > .table-wrap.clientWidth` so the table remains independently scrollable.

### Task 3: Release and verify WPS 1.0.3

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `docs/TRACKER.md`
- Modify: `docs/TASKS.md`
- Modify: `docs/plans/2026-10-23-wcag-landmark-reflow-repair.md`

**Interfaces:**
- Consumes: repository validation scripts, Pages workflow, WPS-021 acceptance test, existing version-manifest build contract.
- Produces: deployed release 1.0.3 with verified accessibility/reflow evidence and resumable handoff records.

- [x] **Step 1: Increment the significant release once**

Change only the root application version from 1.0.2 to 1.0.3 in `package.json` and the synchronized root package entries in `package-lock.json`. Generated `dist/version.json` remains build-owned.

- [ ] **Step 2: Run the full repository gate**

Run: `npm run validate`
Expected: 195-record/map validation succeeds, all existing tests pass, TypeScript succeeds, and Vite builds 1.0.3.

- [ ] **Step 3: Deploy and verify the public behavior**

Require the GitHub Pages workflow for the implementation commit to pass build and deploy. Repeat independent accessibility scans on both public routes; the four targeted failures must be absent. Repeat the 720px reflow audit plus representative 390px and 1920px width checks with no page-level horizontal overflow.

- [ ] **Step 4: Reconcile handoff state**

Mark WPS-021 and WPS-T010 verified only after fresh deploy/live evidence. Record the final workflow run and scan evidence, then confirm `main` is the only branch and the open pull-request inventory is empty.

## Unresolved product decisions

None. The repairs preserve existing content, visuals, public URLs, and interaction contracts.
