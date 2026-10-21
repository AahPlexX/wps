> Repository: `AahPlexX/wps`  
> Authority: `origin/main`  
> Documentation schema: `wps-v1`

# Map country typeahead design

## Goal

Replace the map page's native country `datalist` with a predictable accessible typeahead that begins matching after one typed character and narrows on every keystroke.

## Observable behavior

- An empty input shows no suggestion popup.
- One or more typed characters show only country names whose names start with the typed text.
- Matching is case-insensitive and locale-aware.
- Matching preserves the existing alphabetical country order and does not cap the result count.
- Pointer/touch selection chooses a suggestion immediately.
- Arrow Down and Arrow Up move through visible suggestions.
- Enter selects the active suggestion; when no suggestion is active, the existing exact-match `Show country` behavior remains available.
- Escape closes the popup without changing the selected country.
- Selecting a country continues to update `?country=` and the globe/detail view through the existing `selectCountry` boundary.
- The control exposes standard combobox/listbox semantics, active-option state, and visible focus styling.

## Architecture

Keep matching as the pure `countryTypeaheadMatches` helper in the existing `src/lib/countries.ts` country-utility module so it can be tested without DOM tooling or a new abstraction. `CountryTypeahead` owns popup/open/active-index interaction state and delegates committed selection to `MapPage`. `MapPage` remains responsible for selected-country state, URL synchronization, globe animation, and explicit exact-match validation.

## Visual treatment

The suggestion list extends directly below the existing field using the established data-surface, rule, constitutional-ink, civic-accent, control radius, and focus token. It is not a floating decorative card and adds no new palette, typography, or dependency.

## Non-goals

- Fuzzy matching, typo correction, synonyms, aliases, or natural-language interpretation.
- Searching political metadata from the map country field.
- Adding a third-party combobox or search dependency.
