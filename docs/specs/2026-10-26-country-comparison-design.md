> Repository: `AahPlexX/wps`  
> Authority: `origin/main`  
> Documentation schema: `wps-v1`

# Country comparison design

## Intent

Make WPS's existing comparison promise explicit: a reader should be able to place a small set of countries beside one another and inspect the same normalized political fields without scanning the full directory or switching the globe one country at a time.

## Goals

- Compare two to four unique sovereign states using only the shared political dataset.
- Allow zero or one selection while composing or following a prefilled link.
- Deep-link committed selections and restore them through Back/Forward.
- Reuse the existing accessible country typeahead and country-detail presentation.
- Preserve the constitutional-field-guide visual system and responsive contract.

## Non-goals

- No accounts, saved lists, collaboration, comments, sharing service, video/media surface, export/download workflow, external runtime data, incumbent tracking, or new political fields.
- No multi-select globe mode and no directory-selection tray.
- No client router or new dependency.

## Approaches

1. **Directory comparison tray.** Keeps users on the homepage but couples comparison state to search/filter state and increases density on the most information-heavy surface.
2. **Globe comparison mode.** Offers geographic context but conflicts with the globe's one-country inspection model and unnecessarily couples comparison to canvas interaction.
3. **Dedicated `/compare/` route.** Keeps concerns separate, fits the existing multi-entry Pages architecture, and provides a clean URL/state boundary. **Selected.**

## Interaction design

The page starts with the shared site header, a concise title/explanation, and one add-country typeahead. Selecting or exactly submitting a country appends it if it is not already selected and fewer than four countries are present, then clears the input. Selected countries are listed with explicit Remove actions and a Clear comparison action when applicable. At four selections the add control is replaced by a concise maximum-state message until a country is removed.

With fewer than two selected countries, the results region explains what remains to do. With two to four selections, the page renders one flat country-detail panel per selected state, preserving selection order. Each panel uses the shared fields already exposed by the map: top political assignment, government structure, category, political hierarchy, and explanatory note when present.

## URL and history contract

- Repeated `country=` parameters are the only persisted comparison state.
- Valid country names are matched using the same locale-aware exact comparison used by the map.
- Unknown names and duplicate selections are ignored; the first four unique valid names are retained in URL order.
- User add/remove/clear operations call `history.pushState`; `popstate` restores selection without writing history.
- Typing into the transient add-country input does not change the URL.
- One-country URLs remain valid so other WPS surfaces can prefill a future comparison without inventing another state model.

## Accessibility

The add control reuses the existing ARIA combobox behavior. Remove/Clear actions are native buttons with explicit accessible names. Selection count/status uses an `aria-live="polite"` region. Comparison remains fully readable as semantic HTML without relying on color, pointer input, or canvas perception. Focus is never programmatically moved on ordinary add/remove operations unless validation requires returning to the input.

## Responsive behavior

The page follows `docs/RESPONSIVE_UI.md`. Country detail panels use a fluid grid driven by available inline space; they stack when their minimum readable measure no longer fits. No device detection or new breakpoint family is introduced. The added third primary-nav item must wrap within the existing 640px narrow-layout rule rather than force horizontal page overflow. At 320 CSS px and 200% text, all controls, selected-country actions, detail fields, and notes remain reachable with no page-level horizontal scrolling.

## Release and evidence

This user-visible addition is significant release 1.0.9. Completion requires the focused red→green URL-state test, `npm run validate`, successful Pages build/deploy, live URL/history/typeahead checks, and affected responsive/input verification across compare plus shared navigation on directory/map.
