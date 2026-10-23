# Combobox Tab Sequence Repair Implementation Plan

> **For agentic workers:** Use the host's available task-by-task implementation workflow. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Keep map typeahead suggestions out of sequential page Tab navigation while preserving the existing accessible combobox focus model and all country-selection paths.

**Architecture:** Preserve `CountryTypeahead` and its `aria-activedescendant` state machine. Keep the existing `button[role="option"]` nodes for pointer activation, but explicitly set `tabIndex={-1}` so native button focusability does not compete with the combobox focus model; no new state, abstraction, or dependency is needed.

**Tech Stack:** React 19.3.0, TypeScript 7.0.2, WAI-ARIA combobox/listbox semantics, Node built-in test runner, Vite 8.3.4, GitHub Pages.

## Global Constraints

- Preserve starts-with filtering from the first typed character.
- Preserve ArrowUp/ArrowDown visual option navigation through `aria-activedescendant`.
- Preserve Enter acceptance, Escape dismissal, pointer selection, search validation, selected-country URL state, and globe/detail updates.
- Keep DOM focus on the input while the listbox is open; listbox descendants are not sequential Tab stops.
- Add no dependency and do not rewrite the component.
- This keyboard-accessibility repair is user-visible and releases as 1.0.4 under the repository patch-version contract.

---

### Task 1: Remove options from sequential Tab navigation

**Files:**
- Modify: `src/components/CountryTypeahead.tsx`

**Interfaces:**
- Consumes: existing listbox option buttons, input `aria-activedescendant`, keyboard handlers, pointer handlers.
- Produces: identical suggestions and selection behavior with option buttons removed from the sequential Tab order.

- [x] **Step 1: Preserve the recorded failing behavior**

Use the live 1.0.3 `J` focus audit as red evidence: Jamaica, Japan, and Jordan each render with `tabIndex=0`; moving DOM focus from the combobox to Jamaica causes input blur, popup removal, and `document.activeElement === body`.

- [ ] **Step 2: Implement the minimum repair**

Add `tabIndex={-1}` to the existing option button. Do not change roles, active-index state, blur handling, pointer handling, or selection logic.

- [ ] **Step 3: Verify the focused live contract after deployment**

With `J` entered, verify all visible option nodes report `tabIndex=-1`, the input is the DOM active element, ArrowDown changes `aria-activedescendant`, Enter selects the referenced country, and pointer activation still selects a country.

### Task 2: Release and verify WPS 1.0.4

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `docs/TRACKER.md`
- Modify: `docs/TASKS.md`
- Modify: `docs/plans/2026-10-23-combobox-tab-sequence-repair.md`

**Interfaces:**
- Consumes: repository validation scripts, existing version-manifest build contract, WPS-022 acceptance test.
- Produces: deployed release 1.0.4 with verified focus behavior and resumable handoff state.

- [ ] **Step 1: Increment the significant release once**

Change only the root application version from 1.0.3 to 1.0.4 in `package.json` and synchronized root package entries in `package-lock.json`.

- [ ] **Step 2: Run the full repository gate**

Run: `npm run validate`
Expected: 195-record/map validation succeeds, all existing tests pass, TypeScript succeeds, and Vite builds 1.0.4.

- [ ] **Step 3: Deploy and verify public behavior**

Require the implementation commit's GitHub Pages build and deploy jobs to succeed. Verify the live manifest is 1.0.4 and repeat the focused typeahead audit at representative desktop and 390px widths without page overflow.

- [ ] **Step 4: Reconcile handoff state**

Mark WPS-022 and WPS-T011 verified only after fresh deploy/live evidence, then confirm only `main` exists and the open pull-request inventory is empty.

## Unresolved product decisions

None. This changes only the native sequential focusability of listbox option buttons.
