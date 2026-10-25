> Repository: `AahPlexX/wps`  
> Authority: `origin/main`  
> Documentation schema: `wps-v1`

# Repository Responsive UI Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Establish the permanent WPS responsive UI contract and repair the verified narrow-map/large-text failure without redesigning working surfaces.

**Architecture:** Keep the existing React/Tailwind/conventional-CSS layout architecture and its 1080/820/640 desktop-first breakpoints. Use the already observed live browser failure as the layout red test, retain the existing Node suite as the application regression gate, and make only intrinsic-width, map-instruction-flow, safe-area, and logical-property changes justified by the audit.

**Tech Stack:** React 19.3.0, TypeScript 7.0.2, Tailwind CSS 4.3.3, conventional CSS, Vite 8.3.4, Node built-in test runner, GitHub Pages, browser-rendered live QA.

**Spec:** `docs/specs/2026-10-24-repository-responsive-ui-design.md`

## Global Constraints

- `origin/main` only; no pull requests or side branches.
- No dependency, reset, responsive framework, device sniffing, or political-data change.
- Preserve existing visual identity and working desktop/mobile behavior.
- Use current centralized 1080px, 820px, and 640px media-query structure; add no breakpoint unless a new content failure proves it necessary.
- The first responsive implementation deployed as 1.0.5; because verification found a second user-visible responsive defect after that deployment, the corrective final release is exactly 1.0.6.
- Keep `docs/RESPONSIVE_UI.md`, PRD/tracker/tasks/decisions/design/sources current at each stopping point.

## Review Focus

- 320px + 200% text together: no page-width growth and no clipped/obscuring map instructions.
- Safe-area left/right asymmetry: shell content remains inset without changing normal viewport gutters.
- RTL and long strings: controls/dividers/alignment remain logical and page-width-contained.
- Short 256px height: map controls and dialog actions remain reachable by vertical/internal scrolling.
- Existing keyboard/pointer map/typeahead behavior: responsive structural changes do not alter interaction state or focus contracts.

---

### Task 1: Establish responsive governance and preserve the rendered red test

**Files:**
- Create: `docs/RESPONSIVE_UI.md`
- Modify: `AGENTS.md`, `README.md`, `DESIGN.md`, `docs/DOCUMENTATION.md`, `docs/PRD.md`, `docs/TRACKER.md`, `docs/TASKS.md`, `docs/DECISIONS.md`, `docs/SOURCES.md`

**Interfaces:**
- Consumes: current viewport metadata, CSS source, responsive architecture, Vite browser target, package validation command.
- Produces: WPS-023/WPS-T012 plus a permanent responsive implementation and verification contract.

- [x] **Step 1: Inspect the current UI architecture and capture live baseline evidence**

Map both public routes at 320px, 200% text, combined width/text, 256px short height, long-string/RTL, and update-dialog stress. Preserve the verified map red measurements in tracker/task/spec records.

- [x] **Step 2: Write the repository responsive standard and design/plan records**

Record the existing stack, breakpoints, effective browser target, implementation rules, verification matrix, selected minimal approach, and live red evidence.

- [x] **Step 3: Define the CSS/browser TDD seam**

Use the live 1.0.4 320px + 200% map audit as the failing behavioral test: `clientWidth=320`, `scrollWidth=339`, `.map-status` 589px high inside a 464px overflow-hidden stage. Do not add a browser-test dependency or brittle source-text assertions solely to reproduce layout-engine behavior.

### Task 2: Repair the audited map/responsive contract failures

**Files:**
- Modify: `src/components/GlobeCanvas.tsx`
- Modify: `src/styles.css`
- Modify: `src/components/CountryTypeahead.css`

**Interfaces:**
- Consumes: existing `.globe-stage`, `.map-status`, `.directory-link`, `.site-shell`, 640px narrow-layout block, and typeahead option style.
- Produces: unchanged globe interaction plus width-contained large-text layout and logical/safe-area styling.

- [x] **Step 1: Make globe instructions independently flowable**

Wrap `.globe-stage` and `.map-status` in `.globe-shell`; keep stage ref/canvas/tooltip inside the stage and instruction text as the shell sibling. Preserve the default absolute overlay using `.globe-shell { position: relative; min-width: 0; }`; in the existing 640px media block make `.map-status` static with full available width and normal-flow margin.

- [x] **Step 2: Remove the audited intrinsic-width trigger**

Allow `.directory-link` text to wrap and cap it to available inline size; retain existing action styling and narrow-layout fit-content behavior.

- [x] **Step 3: Harden safe-area and directional layout without changing canvas math**

Refactor `.site-shell` to preserve its existing content width through physical left/right safe-area-aware padding; give the nav shell its existing narrower visual gutter using the same physical safe-area treatment. Convert presentational directional alignment/border/inset rules to logical properties, including typeahead option text alignment. Keep pointer-derived tooltip coordinates physical. Keep update-dialog dimensions safe-area-aware without changing its normal rectangular-viewport size.

- [x] **Step 4: Run `npm test`**

Expected: all existing Node tests pass; no application/data interaction regresses. The final 1.0.6 repository gate in run `40152592492` executed the same Node suite with 10/10 passing.

### Task 3: Release and verify 1.0.5

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `docs/TRACKER.md`, `docs/TASKS.md`, this plan, and affected evidence records.

**Interfaces:**
- Consumes: complete Task 2 source and repository release-version contract.
- Produces: deployed 1.0.5 with fresh repository/live evidence and resumable final handoff.

- [x] **Step 1: Increment package and lock root version from 1.0.4 to 1.0.5 exactly once**

Do not hand-edit generated `dist/version.json`; Vite owns it.

- [x] **Step 2: Run the full repository gate**

Run `npm run validate`. Expected: 195-record/map validation, all Node tests, TypeScript, and Vite production build succeed. Pages run `40152295780` passed the repository build/validation job for 1.0.5.

- [x] **Step 3: Require the implementation Pages workflow to build and deploy successfully**

Record the exact implementation SHA and workflow run. Implementation `e7a24c598206246df80d736bd070ea406207bb2d`, run `40152295780`, built and deployed successfully.

- [x] **Step 4: Repeat the live responsive matrix**

Verify both routes at 320px; 200% text separately and with 320px; map at 256px height; original 320px+200% defect; representative intermediate/wide layouts; RTL/long-string stress; update-dialog short-height/text-scale behavior; and affected keyboard/pointer interactions. Page `scrollWidth` must not exceed `clientWidth` except within explicitly scoped table/map regions. The original map case passed on 1.0.5; the continued directory check exposed a zero-width stacked value track, transferring final acceptance to Task 4 rather than hiding the failure.

- [x] **Step 5: Transfer failed matrix evidence to the corrective task**

Preserve the 1.0.5 directory failure, keep WPS-023/WPS-T012 open, and continue under Task 4 as 1.0.6. Final verification/handoff moves to Task 4 so the failed matrix is never recorded as complete.

### Task 4: Correct the stacked-record text-scale collapse and release 1.0.6

**Files:**
- Modify: `src/styles.css`
- Modify: `package.json`, `package-lock.json`
- Modify: `DESIGN.md`, `docs/TRACKER.md`, `docs/TASKS.md`, `docs/DECISIONS.md`, this plan

**Interfaces:**
- Consumes: the existing <=640px stacked-record grid and the live 320px + 200% text verification seam.
- Produces: nonzero label/value tracks at enlarged text without a new breakpoint or layout architecture.

- [x] **Step 1: Preserve root-cause evidence and test the single hypothesis**

Live 1.0.5 measured every stacked cell at `243.188px 0px` tracks with a 25.6px gap; the hierarchy cell grew to 5100.8px. A temporary browser-only override to `minmax(0,.8fr) minmax(0,1.2fr)` produced 71.7px/107.5px tracks and retained 320/320 page width.

- [x] **Step 2: Apply the one-line root-cause correction and bump 1.0.6**

Remove the fixed `7.6rem` minimum from the first stacked-record track and synchronize package/lock to 1.0.6. Do not alter the breakpoint, data markup, or normal table layout.

- [x] **Step 3: Validate and deploy 1.0.6**

Require `npm run validate` and the exact 1.0.6 Pages workflow to pass. Run `40152592492` on `6333ac9da9b86be47864b0a7f99be899f60bc223` passed: 195 political records, 195 map targets, 29 point targets, 10/10 Node tests, TypeScript/Vite build, and Pages deployment.

- [x] **Step 4: Restart and complete the full live responsive matrix**

Repeat all WPS-023 viewport/text/height/boundary/RTL/dialog/input checks from the beginning; explicitly measure stacked label/value tracks so page-level width alone cannot mask a content-collapse defect. Green live 1.0.6 evidence includes: 320px + 200% directory at 320/320 with 71.7px/107.5px tracks; map 320/320 with normal-flow instructions; 641px table overflow scoped at 603/1050; 720px both routes contained; breakpoint sides 640/641, 820/821, 1080/1081; both routes at 1920px; map at 844×390 and 1024×256; dialog at 320×256 + 200% plus centered 390/1920; desktop keyboard Jamaica selection; RTL/long-content touch Japan selection. Final automated directory/map scans each reported 0 failures / 0 instances.

- [x] **Step 5: Reconcile final handoff**

Mark WPS-023/WPS-T012 verified only after all fresh evidence is green; record unverified hardware/manual checks and set next significant version to 1.0.7. Real nonzero safe-area cutout hardware, physical foldable hinge geometry, real mobile virtual-keyboard behavior, and manual human screen-reader listening were not exercised in this environment and are not inferred from automation. Repository branch/PR inventory and the final documentation SHA workflow must still be checked immediately after this closure commit before any external completion claim.

## Unresolved product decisions

None. The owner explicitly directed repository-wide responsive governance; the implementation preserves the existing product and changes only evidence-backed responsive failures.
