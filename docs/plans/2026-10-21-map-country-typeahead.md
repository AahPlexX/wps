> Repository: `AahPlexX/wps`  
> Authority: `origin/main`  
> Documentation schema: `wps-v1`

# Map Country Typeahead Implementation Plan

> **For agentic workers:** Use the host's available task-by-task implementation workflow. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a one-character-starting, starts-with country autocomplete to the 3D map while preserving URL selection, globe behavior, and accessibility.

**Architecture:** Put locale-aware prefix matching in a pure helper and render the popup through a focused React combobox component. `MapPage` keeps authoritative selected-country state and the existing `selectCountry` URL/globe integration boundary.

**Tech Stack:** React 19.3.0, TypeScript 7.0.2, Tailwind CSS 4.3.3, existing CSS tokens, Node built-in test runner.

## Global Constraints

- Start suggestions after one typed character; an empty query shows no suggestions.
- Match country names by case-insensitive locale-aware prefix only.
- Show every matching country in existing alphabetical order.
- Support pointer/touch plus Arrow Down, Arrow Up, Enter, and Escape.
- Preserve the `Show country` exact-match action, `?country=` deep links, globe selection, and selected-country detail.
- Use semantic combobox/listbox/option behavior and visible focus states.
- Add no dependency and do not duplicate country data.

---

### Task 1: Add and verify prefix matching

**Files:**
- Create: `src/lib/countryTypeahead.ts`
- Test: `tests/typeahead.test.ts`

**Interfaces:**
- Consumes: ordered `string[]` country names, query string, optional locale.
- Produces: `countryTypeaheadMatches(countryNames: string[], query: string, locale?: string): string[]`.

- [ ] **Step 1: Add the focused failing test**

Assert an empty query returns no options; `j` returns Jamaica, Japan, Jordan; `JA` returns Jamaica and Japan; `jap` returns Japan; and a non-prefix fragment such as `pan` does not return Japan.

- [ ] **Step 2: Verify the relevant failure**

Run: `npm test`
Expected: the new typeahead test fails because `src/lib/countryTypeahead.ts` does not yet exist.

- [ ] **Step 3: Implement the minimum behavior**

Normalize the trimmed query with `toLocaleLowerCase(locale)`. Return `[]` for an empty query. Filter the supplied ordered names with `name.toLocaleLowerCase(locale).startsWith(normalizedQuery)` and preserve input order.

- [ ] **Step 4: Verify the focused pass**

Run: `npm test`
Expected: all country, globe, and typeahead tests pass.

- [ ] **Step 5: Run the affected integration check**

Run: `npm run validate`
Expected: data validation, tests, TypeScript, and Vite production build all pass.

- [ ] **Step 6: Commit the passing deliverable**

Commit the helper and focused test together.

### Task 2: Replace the native datalist with the accessible typeahead

**Files:**
- Create: `src/components/CountryTypeahead.tsx`
- Modify: `src/pages/MapPage.tsx`
- Modify: `src/styles.css`
- Modify: `docs/PRD.md`
- Modify: `docs/TRACKER.md`
- Modify: `docs/TASKS.md`
- Modify: `docs/DECISIONS.md`

**Interfaces:**
- Consumes: `countryNames`, controlled `value`, `onValueChange`, and `onSelect`.
- Produces: a labeled search input with ARIA combobox state plus a visible listbox of prefix matches.

- [ ] **Step 1: Add the focused failing test**

The pure matcher coverage from Task 1 is the non-DOM regression boundary; browser QA covers popup and keyboard integration because the repository intentionally has no DOM test framework.

- [ ] **Step 2: Verify the relevant failure**

Before implementation, live map behavior uses the native `datalist` and therefore does not provide the required deterministic one-character filtered popup.

- [ ] **Step 3: Implement the minimum behavior**

Render suggestions only when the trimmed query is non-empty and the component is focused/open. Track `activeIndex`; Arrow Down/Up wraps within visible matches, Enter selects the active option, Escape closes, and pointer selection commits immediately. Use `role="combobox"`, `aria-expanded`, `aria-controls`, `aria-autocomplete="list"`, `aria-activedescendant`, `role="listbox"`, and `role="option"`. Keep `MapPage.findCountry()` for the explicit button/exact-match fallback.

- [ ] **Step 4: Verify the focused pass**

Run: `npm test`
Expected: all tests pass.

- [ ] **Step 5: Run the affected integration check**

Run: `npm run validate`, then browser-check `/wps/map/` at phone and desktop widths. Expected: no horizontal overflow; typing `J` shows Jamaica/Japan/Jordan; typing `Ja` leaves Jamaica/Japan; keyboard and pointer selection update the detail and `?country=`.

- [ ] **Step 6: Commit the passing deliverable**

Commit component, map integration, styles, and reconciled documentation together.

## Unresolved product decisions

None. The owner approved starts-with typeahead behavior and requested execution.
