> Repository: `AahPlexX/wps`  
> Authority: `origin/main`  
> Documentation schema: `wps-v1`

# Myanmar Post-2026 Structure Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Correct Myanmar's stale commander-in-chief-led record to the verified post-2026 military-backed presidential structure and release it as 1.0.7.

**Architecture:** Preserve the existing JSON-backed data model and all UI code. Pin the discovered drift with one focused Node test, change only Myanmar plus the expected category totals, then use the existing validation/deploy pipeline and live surfaces as acceptance evidence.

**Tech Stack:** JSON country shards, Node built-in test runner, Vite/TypeScript/React consumer surfaces, GitHub Pages.

**Spec:** `docs/specs/2026-10-25-myanmar-structure-refresh-design.md`

## Global Constraints

- `origin/main` only; no PRs or side branches.
- No dependency, schema, UI, map-geometry, or runtime-network change.
- Keep external research provenance in `docs/SOURCES.md`, never the public client.
- Significant public-data correction releases as exactly 1.0.7.
- Keep PRD/tracker/tasks/decisions/sources/plan current at every stopping point.

## Review Focus

- Myanmar must no longer place Commander-in-Chief above the President.
- The current roster contains no Prime Minister; do not preserve an obsolete Prime Minister tier.
- Military dominance must remain represented in the system/note rather than being erased by the presidential title.
- Reclassification changes only category totals (President +1, Other/transitional -1), not the 195-state/map counts.
- Directory and map must continue reading the same shared record.

---

### Task 1: Preserve the stale-record failure

**Files:**
- Create: `tests/political-data.test.ts`
- Create: `docs/specs/2026-10-25-myanmar-structure-refresh-design.md`
- Create: `docs/plans/2026-10-25-myanmar-structure-refresh.md`
- Modify: `docs/PRD.md`, `docs/TRACKER.md`, `docs/TASKS.md`, `docs/DECISIONS.md`, `docs/SOURCES.md`

- [x] **Step 1: Record WPS-024/WPS-T013, source evidence, design, and plan.**
- [x] **Step 2: Add a focused test expecting the verified post-2026 Myanmar record.**
- [ ] **Step 3: Require the main workflow to fail specifically on the stale Myanmar group/structure assertion.**

### Task 2: Apply the minimum data correction

**Files:**
- Modify: `src/data/countries/m-p.json`
- Modify: `scripts/validate-data.mjs`
- Modify: `package.json`, `package-lock.json`
- Modify: affected evidence documentation

- [ ] **Step 1: Change only Myanmar to the selected record semantics.**
- [ ] **Step 2: Update category totals from President 141 / Other 4 to President 142 / Other 3.**
- [ ] **Step 3: Increment package and lock root version exactly once from 1.0.6 to 1.0.7.**
- [ ] **Step 4: Run `npm run validate`; require 195 records, 195 map targets, 29 point targets, all Node tests, TypeScript, and Vite build to pass.**

### Task 3: Deploy and reconcile

- [ ] **Step 1: Require the exact 1.0.7 Pages workflow to build and deploy successfully.**
- [ ] **Step 2: Live-smoke `/wps/` and `/wps/map/` for Myanmar group, assignment, hierarchy, shared detail, and no page-level regression at a representative desktop and 390px width.**
- [ ] **Step 3: Update `docs/SOURCES.md` dataset as-of date to 2026-10-25, mark WPS-024/WPS-T013 verified only from fresh evidence, set next significant version to 1.0.8, and confirm only `main` with no open PRs.**
- [ ] **Step 4: Require the final documentation SHA's workflow to pass.**
