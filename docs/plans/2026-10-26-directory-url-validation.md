> Repository: `AahPlexX/wps`  
> Authority: `origin/main`  
> Documentation schema: `wps-v1`

# Directory URL validation implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Prevent unsupported controlled directory query values from becoming hidden filter state while preserving valid deep links and history behavior.

**Architecture:** Validate URL-owned enum values in `directoryFiltersFromSearch()` before they become React state. `HomePage` supplies the static government-structure options it already renders; filtering, history writes, markup, CSS, and routing remain unchanged.

**Tech Stack:** React 19.3.0, TypeScript 7.0.2, Vite 8.3.4, Node test runner.

**Spec:** `docs/specs/2026-10-26-directory-url-validation-design.md`

## Global constraints

- Work only on `origin/main`; no pull request.
- No dependency or breakpoint changes.
- Keep `docs/RESPONSIVE_UI.md` authoritative for client-facing verification.
- Significant behavior correction increments 1.0.7 exactly once to 1.0.8.
- Preserve WPS-020: valid user-generated Back/Forward restoration must not write replacement history entries.

## Review focus

- Unknown category must not filter out all countries while the category select shows its default.
- Unknown structure must not filter out all countries while the structure select shows its default.
- Unknown group must continue to normalize to the default grouping.
- Valid category/structure/group values must still restore exactly.
- 390px malformed-link rendering must remain page-width contained; no layout file changes are expected.

### Task 1: Record and prove the defect

- [x] **Step 1:** Record WPS-025/WPS-T015, the live 1.0.7 reproduction, design, and plan.
- [x] **Step 2:** Add a focused parser test expecting unsupported controlled values to normalize to visible defaults.
- [x] **Step 3:** Require the exact red workflow to fail on that new assertion while existing tests/data validation remain green. Red run: `40345589821` (11 existing tests passed; only the new parser assertion failed).

### Task 2: Implement the parser-boundary correction

- [x] **Step 1:** Change `directoryFiltersFromSearch(search, validStructures)` to validate category against `GROUP_ORDER`, structure against `validStructures`, and keep current group normalization/free-text search.
- [x] **Step 2:** Move the static government-structure list in `HomePage.tsx` to module scope and pass it to the parser on initial state and `popstate`.
- [x] **Step 3:** Run `npm run validate`; green run `40345901843` validated 195 political records, 195 map targets, category totals, 29 point targets, 12/12 Node tests, TypeScript, and Vite 8.3.4 build.
- [x] **Step 4:** Increment package and lock root version exactly once from 1.0.7 to 1.0.8 in the same green implementation release.

### Task 3: Deploy and verify

- [x] **Step 1:** Require the exact 1.0.8 Pages workflow to build and deploy successfully. Run `40345901843` completed build and deploy successfully on SHA `64e51e51158df671728c9e6b8cde04e52bf14c83`.
- [x] **Step 2:** Live-smoke the malformed query at 390px: default controls, 195 results, and document width contained. Verified `All assignments` / `All structures` / `Top assignment`, 195 results, and 390/390 document width while leaving the malformed URL text untouched.
- [x] **Step 3:** Live-smoke a valid category/structure/group deep link at desktop width and confirm URL/control/result coherence. Verified Monarch + Parliamentary constitutional monarchy + group=system, 29 results under that structure, and 1366/1366 width.
- [x] **Step 4:** Reconcile tracker/tasks/plan evidence and set next significant version to 1.0.9. Branch/PR inventory is rechecked at final closure.
- [x] **Step 5:** Require the documentation closure SHA workflow to pass. Closure SHA `02633803e9d2b271fe78fe75d53924ad93ebe8a4` passed build/validation and Pages deployment in run `40346570022`.
