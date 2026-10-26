> Repository: `AahPlexX/wps`  
> Authority: `origin/main`  
> Documentation schema: `wps-v1`

# Malformed directory deep-link validation design

## Intent

Keep the directory's visible controls, result set, and accepted URL-backed state coherent when a copied or manually edited URL contains unsupported controlled filter values.

## Evidence

On deployed 1.0.7, `?category=bogus&structure=bogus&group=bogus` renders `All assignments`, `All structures`, and `Top assignment`, but shows 0 results because invalid category/structure strings remain in hidden React filter state. The map does not exhibit the analogous initial-load defect because it validates its `country` URL value before restoring state.

## Goals

- Reject unsupported category and structure values before they enter directory filter state.
- Keep the existing `group=system` / default-group behavior.
- Preserve arbitrary free-text `q` search.
- Preserve valid deep links and WPS-020 user-generated Back/Forward behavior.
- Keep current UI, responsive layout, dependency graph, and two-entry-point architecture unchanged.

## Non-goals

- Do not add router/canonicalization infrastructure.
- Do not rewrite malformed URLs or browser-history entries merely to clean their text.
- Do not expose unsupported query values as synthetic select options.
- Do not change filter matching, grouping, layout, or political data.

## Approaches

1. **Validate at the parser boundary — selected.** `directoryFiltersFromSearch()` receives the current valid structure list, accepts categories only from `GROUP_ORDER`, accepts structures only from that list, and keeps the existing group normalization. This fixes the source of invalid hidden state with minimal coupling.
2. **Rewrite malformed URLs.** Rejected because it adds history/canonicalization behavior that WPS-020 does not require and creates unnecessary edge cases around `popstate`.
3. **Render unknown values in the selects.** Rejected because invalid state would become visible product state instead of being safely ignored.

## Responsive/accessibility impact

No markup or CSS changes are planned. Under `docs/RESPONSIVE_UI.md`, verification is therefore targeted: malformed-state QA at 390px must remain width-contained and preserve every control/result; a representative desktop valid deep link must still restore correctly.
