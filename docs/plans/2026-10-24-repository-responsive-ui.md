> Repository: `AahPlexX/wps`  
> Authority: `origin/main`  
> Documentation schema: `wps-v1`

# Repository Responsive UI Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Establish the permanent WPS responsive UI contract and repair the verified narrow-map/large-text failure without redesigning working surfaces.

**Architecture:** Keep the existing React/Tailwind/conventional-CSS layout architecture and its 1080/820/640 desktop-first breakpoints. Add source-level contract tests with the existing Node runner, then make only intrinsic-width, map-instruction-flow, safe-area, and logical-property changes justified by the audit.

**Tech Stack:** React 19.3.0, TypeScript 7.0.2, Tailwind CSS 4.3.3, conventional CSS, Vite 8.3.4, Node built-in test runner, GitHub Pages, browser-rendered live QA.

**Spec:** `docs/specs/2026-10-24-repository-responsive-ui-design.md`

## Global Constraints

- `origin/main` only; no pull requests or side branches.
- No dependency, reset, responsive framework, device sniffing, or political-data change.
- Preserve existing visual identity and working desktop/mobile behavior.
- Use current centralized 1080px, 820px, and 640px media-query structure; add no breakpoint unless a new content failure proves it necessary.
- Significant release is exactly 1.0.5.
- Keep `docs/RESPONSIVE_UI.md`, PRD/tracker/tasks/decisions/design/sources current at each stopping point.

## Review Focus

- 320px + 200% text together: no page-width growth and no clipped/obscuring map instructions.
- Safe-area left/right asymmetry: shell content remains inset without changing normal viewport gutters.
- RTL and long strings: controls/dividers/alignment remain logical and page-width-contained.
- Short 256px height: map controls and dialog actions remain reachable by vertical/internal scrolling.
- Existing keyboard/pointer map/typeahead behavior: responsive structural changes do not alter interaction state or focus contracts.

---

### Task 1: Add responsive governance and contract test

**Files:**
- Create: `docs/RESPONSIVE_UI.md`
- Create: `tests/responsive-contract.test.ts`
- Modify: `AGENTS.md`, `README.md`, `DESIGN.md`, `docs/DOCUMENTATION.md`, `docs/PRD.md`, `docs/TRACKER.md`, `docs/TASKS.md`, `docs/DECISIONS.md`, `docs/SOURCES.md`

**Interfaces:**
- Consumes: current viewport metadata, CSS source, responsive architecture, Vite browser target, package validation command.
- Produces: WPS-023/WPS-T012 plus a machine-checked source contract used by all future UI work.

- [x] **Step 1: Inspect the current UI architecture and capture live baseline evidence**

Map both public routes at 320px, 200% text, combined width/text, 256px short height, long-string/RTL, and update-dialog stress. Preserve the verified map red measurements in tracker/task/spec records.

- [x] **Step 2: Write the repository responsive standard and design/plan records**

Record the existing stack, breakpoints, effective browser target, implementation rules, verification matrix, selected minimal approach, and live red evidence.

- [ ] **Step 3: Add the failing source-contract test**

Create `tests/responsive-contract.test.ts` using only `node:test`, `node:assert/strict`, and `node:fs`. Assert zoom-preserving viewport metadata, all four safe-area variables when `viewport-fit=cover` is used, scoped table overflow/no global overflow suppression, narrow normal-flow `.map-status`, and logical directional properties.

- [ ] **Step 4: Run the test and record the intentional red result**

Run `npm test`. Expected: existing tests pass and the new responsive-contract suite fails only on source conditions intentionally absent from the 1.0.4 implementation.

### Task 2: Repair the audited map/responsive contract failures

**Files:**
- Modify: `src/components/GlobeCanvas.tsx`
- Modify: `src/styles.css`
- Modify: `src/components/CountryTypeahead.css`
- Test: `tests/responsive-contract.test.ts`

**Interfaces:**
- Consumes: existing `.globe-stage`, `.map-status`, `.directory-link`, `.site-shell`, 640px narrow-layout block, and typeahead option style.
- Produces: unchanged globe interaction plus width-contained large-text layout and logical/safe-area styling.

- [ ] **Step 1: Make globe instructions independently flowable**

Wrap `.globe-stage` and `.map-status` in `.globe-shell`; keep stage ref/canvas/tooltip inside the stage and instruction text as the shell sibling. Preserve the default absolute overlay using `.globe-shell { position: relative; min-width: 0; }`; in the existing 640px media block make `.map-status` static with full available width and normal-flow margin.

- [ ] **Step 2: Remove the audited intrinsic-width trigger**

Allow `.directory-link` text to wrap and cap it to available inline size; retain existing action styling and narrow-layout fit-content behavior.

- [ ] **Step 3: Harden safe-area and directional layout without changing canvas math**

Make narrow page/nav shell widths account for both inline safe-area insets; convert presentational left/right alignment/border/inset rules to logical properties, including typeahead option text alignment. Keep pointer-derived tooltip coordinates physical.

- [ ] **Step 4: Run `npm test` and confirm the responsive contract turns green**

Expected: all existing tests plus the new responsive-contract tests pass.

### Task 3: Release and verify 1.0.5

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `docs/TRACKER.md`, `docs/TASKS.md`, this plan, and affected evidence records.

**Interfaces:**
- Consumes: complete Task 2 source and repository release-version contract.
- Produces: deployed 1.0.5 with fresh repository/live evidence and resumable final handoff.

- [ ] **Step 1: Increment package and lock root version from 1.0.4 to 1.0.5 exactly once**

Do not hand-edit generated `dist/version.json`; Vite owns it.

- [ ] **Step 2: Run the full repository gate**

Run `npm run validate`. Expected: 195-record/map validation, all Node tests, TypeScript, and Vite production build succeed.

- [ ] **Step 3: Require the implementation Pages workflow to build and deploy successfully**

Record the exact implementation SHA and workflow run.

- [ ] **Step 4: Repeat the live responsive matrix**

Verify both routes at 320px; 200% text separately and with 320px; map at 256px height; original 320px+200% defect; representative intermediate/wide layouts; RTL/long-string stress; update-dialog short-height/text-scale behavior; and affected keyboard/pointer interactions. Page `scrollWidth` must not exceed `clientWidth` except within explicitly scoped table/map regions.

- [ ] **Step 5: Reconcile handoff and final exact-SHA validation**

Mark WPS-023/WPS-T012 verified only after fresh evidence, close all plan checkboxes, set next significant version to 1.0.6, confirm only `main`, confirm open PR inventory empty, and require the final documentation SHA's workflow to pass.

## Unresolved product decisions

None. The owner explicitly directed repository-wide responsive governance; the implementation preserves the existing product and changes only evidence-backed responsive failures.
