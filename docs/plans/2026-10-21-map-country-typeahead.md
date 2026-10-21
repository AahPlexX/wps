> Repository: `AahPlexX/wps`  
> Authority: `origin/main`  
> Documentation schema: `wps-v1`

# Map Country Typeahead Implementation Plan

**Goal:** Add a one-character-starting, starts-with country autocomplete to the 3D map while preserving URL selection, globe behavior, and accessibility.

**Architecture:** Keep locale-aware prefix matching in the existing country utility module and render the popup through a focused React combobox component. `MapPage` keeps authoritative selected-country state and the existing `selectCountry` URL/globe integration boundary.

**Tech Stack:** React 19.3.0, TypeScript 7.0.2, Tailwind CSS 4.3.3, existing CSS tokens, Node built-in test runner.

## Global Constraints

- Start suggestions after one typed character; an empty query shows no suggestions.
- Match country names by case-insensitive locale-aware prefix only.
- Show every matching country in existing alphabetical order.
- Support pointer/touch plus Arrow Down, Arrow Up, Enter, and Escape.
- Preserve the `Show country` exact-match action, `?country=` deep links, globe selection, and selected-country detail.
- Use semantic combobox/listbox/option behavior and visible focus states.
- Add no dependency and do not duplicate country data.

### Task 1: Add and verify prefix matching

**Files:**
- Modify: `src/lib/countries.ts`
- Create: `tests/typeahead.test.ts`

- [x] Add the focused failing test for empty, one-character, multi-character, case-insensitive, and non-prefix behavior.
- [x] Record the expected red: run `39683845722` failed only because `countryTypeaheadMatches` was not yet exported while the existing six tests remained green.
- [x] Add `countryTypeaheadMatches` to `src/lib/countries.ts` using trimmed locale-aware lowercase prefix comparison.
- [x] Record the green matcher/build gate in run `39684002080`.

### Task 2: Replace the native datalist with the accessible typeahead

**Files:**
- Create: `src/components/CountryTypeahead.tsx`
- Create: `src/components/CountryTypeahead.css`
- Modify: `src/pages/MapPage.tsx`
- Modify: `docs/PRD.md`
- Modify: `docs/TRACKER.md`
- Modify: `docs/TASKS.md`
- Modify: `docs/DECISIONS.md`

- [x] Replace native `datalist` behavior with a controlled combobox/listbox using the shared matcher.
- [x] Preserve exact-match `Show country`, `selectCountry`, globe animation, detail rendering, and `?country=` URL synchronization.
- [x] Support Arrow Down/Up, Enter, Escape, pointer/touch selection, an aria-live match count, and active-option semantics.
- [x] Pass full repository validation and Pages deployment in run `39684424181`.
- [x] Live QA: `J` => Jamaica/Japan/Jordan; `Ja` => Jamaica/Japan; keyboard selection => Jamaica + `?country=Jamaica`; pointer selection => Japan + `?country=Japan`; 390px viewport remained `scrollWidth=clientWidth=390`.

## Unresolved product decisions

None. The owner approved starts-with typeahead behavior and requested execution.
