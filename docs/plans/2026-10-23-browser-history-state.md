# Browser History State Repair Implementation Plan

> **For agentic workers:** Use the host's available task-by-task implementation workflow. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make URL-backed directory filters and map country selection genuinely navigable with browser Back and Forward while avoiding one history entry per search character.

**Architecture:** Keep each page's existing React state and query-parameter schema. User-driven discrete state changes call `history.pushState`; directory search starts one pushed entry per focus/edit session and replaces that entry for subsequent keystrokes; `popstate` only restores React state. A small pure history-policy helper supplies the search push/replace decision and a map URL helper preserves unrelated query parameters and hashes.

**Tech Stack:** React 19.3.0, TypeScript 7.0.2, browser History API, Node built-in test runner, Vite 8.3.4, GitHub Pages.

## Global Constraints

- Preserve the existing directory query parameters: `q`, `category`, `structure`, and `group`.
- Preserve the existing map query parameter: `country`.
- User-driven category, structure, grouping, clear-filter, and map-country changes create a new browser-history entry.
- The first directory-search edit in a focus session creates one browser-history entry; subsequent keystrokes replace that same entry until blur or `popstate`.
- Back and Forward restore React state from the current URL without adding or replacing a history entry.
- Initial map canonicalization may replace the current entry so missing or invalid `country` resolves to the displayed country without adding history.
- This is a significant user-visible repair and must release as 1.0.2 with `package.json`, `package-lock.json`, embedded `__APP_VERSION__`, and generated `version.json` synchronized by the existing build contract.
- Add no dependency and make no visual redesign.

---

### Task 1: Add the history-policy regression contract

**Files:**
- Create: `src/lib/historyState.ts`
- Create: `tests/historyState.test.ts`

**Interfaces:**
- Produces: `searchEditHistoryMode(editActive: boolean): 'push' | 'replace'`.
- Produces: `mapCountryUrl(pathname: string, search: string, hash: string, country: string): string`.

- [ ] **Step 1: Add the focused failing test**

Create `tests/historyState.test.ts` that imports the two proposed helpers before they exist. Assert that the first search edit returns `push`, a later edit in the same session returns `replace`, and `mapCountryUrl('/wps/map/', '?foo=1&country=France', '#detail', 'Japan')` returns `/wps/map/?foo=1&country=Japan#detail`.

- [ ] **Step 2: Verify the relevant failure**

Run: `npm test -- --test-name-pattern="history"`
Expected: non-zero exit because `src/lib/historyState.ts` does not exist; existing tests remain unaffected.

- [ ] **Step 3: Implement the minimum behavior**

Add only the two pure helpers. `searchEditHistoryMode` returns `replace` when `editActive` is true and `push` otherwise. `mapCountryUrl` uses `URLSearchParams`, overwrites `country`, preserves unrelated parameters, and appends the supplied hash.

- [ ] **Step 4: Verify the focused pass**

Run: `npm test -- --test-name-pattern="history"`
Expected: the history-policy test passes with zero failures.

- [ ] **Step 5: Run the affected integration check**

Run: `npm test`
Expected: all existing tests plus the new history-policy tests pass.

- [ ] **Step 6: Continue directly into Task 2**

Do not leave the helper unused in a deployed build; integrate it with both pages in the same 1.0.2 release change.

### Task 2: Integrate navigable history and release 1.0.2

**Files:**
- Modify: `src/pages/HomePage.tsx`
- Modify: `src/pages/MapPage.tsx`
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `docs/TRACKER.md`
- Modify: `docs/TASKS.md`
- Modify: `docs/DECISIONS.md`
- Modify: `docs/plans/2026-10-23-browser-history-state.md`

**Interfaces:**
- Consumes: `searchEditHistoryMode`, `mapCountryUrl`, existing URL parsers, browser `history`, and `popstate`.
- Produces: navigable URL-backed directory and map state with the existing visible UI unchanged.

- [ ] **Step 1: Integrate directory history**

Remove the effect that replaces the URL after every filter state change. Route user-driven filter updates through a small page-local URL writer: discrete controls use `pushState`; search `onChange` uses `searchEditHistoryMode`; search blur and `popstate` end the active search-edit session. The existing `popstate` handler updates React state only.

- [ ] **Step 2: Integrate map history**

Separate state restoration from user selection. User selection pushes `mapCountryUrl(...)` only when the selected country actually changes; the `popstate` handler restores selected/query state without writing history. Keep initial URL canonicalization as a `replaceState` and keep document-title updates independent of history writes.

- [ ] **Step 3: Bump the significant release once**

Change the root package version from 1.0.1 to 1.0.2 in `package.json` and the synchronized root entries in `package-lock.json`. Do not hand-edit `version.json`; the existing Vite build emits it from the package version.

- [ ] **Step 4: Run the full repository gate**

Run: `npm run validate`
Expected: data validation passes, every focused test passes, TypeScript succeeds, and the Vite production build completes at version 1.0.2.

- [ ] **Step 5: Live browser regression QA**

After Pages deploys, verify directory category selection increases `history.length`, Back restores the prior filter URL/result and Forward restores the selection. Verify one contiguous search edit session adds one history entry rather than one per character. Verify map United States→Japan increases `history.length`, Back restores United States in URL/input/detail and Forward restores Japan. Repeat overflow checks at 390px and confirm no visual layout change at 1366px and 1920px.

- [ ] **Step 6: Reconcile repository records**

Mark WPS-020 and WPS-T009 verified only after fresh CI/deploy and live browser evidence. Record the final 1.0.2 run ID and resume state, then confirm only `main` exists and no pull requests are open.

## Unresolved product decisions

None. The existing PRD already requires browser back/forward for directory URL state, and this repair extends the same expected URL-state semantics to map selection without changing visible design or data scope.
