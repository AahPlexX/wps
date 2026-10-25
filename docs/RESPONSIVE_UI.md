> Repository: `AahPlexX/wps`  
> Authority: `origin/main`  
> Documentation schema: `wps-v1`

# Responsive UI standard

## Scope

This standard applies to every client-facing WPS page, component, dialog, control surface, and future UI change. Layout decisions are based on available viewport or container space, not device identity, model, orientation label, or user agent.

## Current implementation contract

- Stack: Vite 8.3.4, TypeScript 7.0.2, React 19.3.0, Tailwind CSS 4.3.3, conventional CSS in `src/styles.css`, and component CSS only where already established.
- Styling convention: shared page/layout behavior stays in the existing CSS architecture; local JSX continues to use existing Tailwind utilities where that is already the component convention.
- Query direction: desktop-first `max-width` media queries.
- Central breakpoints: 1080px, 820px, and 640px, each declared in its single existing `src/styles.css` media block. A new threshold is allowed only when content demonstrably breaks and must not create a second breakpoint system or duplicate a threshold across files.
- Spacing/type: reuse `DESIGN.md` tokens, `--gutter`, existing relative type scales, and established control sizing.
- Production browser target: `vite.config.ts` does not override `build.target`, so Vite 8's `baseline-widely-available` default is authoritative: Chrome 111+, Edge 111+, Firefox 114+, Safari 16.4+, and iOS 16.4+.
- Validation: `npm run validate:data`, Node's built-in test runner through `npm test`, TypeScript, and the Vite production build through `npm run validate`. No separate lint command is currently declared.

## Implementation rules

1. Inspect the current component, its callers, styling method, tokens, breakpoints, target browsers, and relevant tests before editing client UI.
2. Preserve working layouts. Make the smallest reversible change that fixes an evidenced failure; do not opportunistically rewrite unrelated screens.
3. Use flexible layout primitives (`flex`, `grid`, wrapping, percentages, `fr`, `minmax`, `ch`, relative units) and `min-width: 0`/equivalent where intrinsic sizing would otherwise force page overflow.
4. Avoid fixed structural widths/heights when content must grow. Fixed or bounded dimensions are acceptable for intentional media/canvas regions when surrounding content remains accessible and reflows.
5. Keep text in relative units. Text must remain usable with browser/user text enlargement; viewport units may contribute to `clamp()` but must not be the sole text-size input.
6. Preserve browser zoom. Both HTML entry points keep `width=device-width` and must not add `user-scalable=no`, `maximum-scale=1`, or equivalent zoom restrictions.
7. Because both pages use `viewport-fit=cover`, gutters/fixed content must account for relevant `safe-area-inset-top`, `right`, `bottom`, and `left` values. Use logical properties for directional layout unless physical coordinates are intrinsic to pointer/canvas math.
8. Do not hide page overflow to conceal a defect. Tables and the globe may own contained two-dimensional behavior; the rest of the page must reflow around them.
9. Sticky/fixed/overlay UI must not obscure required content or keyboard focus. When text enlargement makes an overlay consume the usable region, move that content into normal flow at the existing content-failure breakpoint.
10. Preserve information and function when stacking/collapsing. Hover is enhancement only; all required actions remain reachable by keyboard, pointer/touch, and accessible HTML alternatives where needed.
11. Maintain pointer targets of at least 24×24 CSS px or equivalent target spacing per WCAG 2.5.8; retain the existing 44–46px control treatment unless evidence requires a change.
12. Handle long strings, empty states, and RTL without page-level overflow. Use `overflow-wrap`, logical properties, and shrinkable flex/grid children rather than truncating required content.
13. No device sniffing, `isTablet`-style layout logic, new responsive dependency, global reset, or new breakpoint framework without an explicit owner-approved architectural change.
14. Use only features supported by the effective production target or provide a usable fallback within that target.

## Verification matrix

Run the relevant portions for every client-facing change and the full matrix for repository-wide responsive work. Record both positive evidence and anything not verifiable in the current environment.

- Vertical-scrolling pages: 320 CSS px width with no page-level two-dimensional scrolling; intentional table/map regions may retain their scoped two-dimensional behavior.
- Horizontal/two-dimensional regions: exercise a 256 CSS px viewport height and ensure surrounding controls/instructions remain reachable without page-level horizontal scrolling.
- Text enlargement: 200% text size without lost/clipped content or function; include the combined 320px-width + 200%-text case because independent width/text checks can miss intrinsic-size failures.
- Intermediate and wide widths: include content-failure boundaries plus representative 720/820/1080 and wide desktop conditions when affected.
- Input: keyboard-only navigation plus pointer/touch for affected controls; hover cannot be required.
- Orientation/resizing: exercise portrait and landscape-shaped viewports or equivalent resizes rather than detecting orientation in code.
- Content stress: long strings and RTL direction; verify shrink/wrap behavior and logical alignment.
- Safe areas: inspect all four inset uses whenever `viewport-fit=cover` remains enabled. Real cutout hardware/Safari testing is recorded separately when unavailable to automation.
- Dialogs/sticky/fixed UI: include short-height and increased-text tests so actions/focus are not obscured.
- Accessibility automation may supplement these checks but does not by itself establish full WCAG compliance or replace human assistive-technology review.

## Change-record rule

A responsive implementation change updates the relevant PRD requirement, tracker, active task, decision/design/standard records, and verification evidence in the same coherent work unit. If an audit finds a defect outside the requested implementation scope, record and report it rather than silently changing unrelated UI.
