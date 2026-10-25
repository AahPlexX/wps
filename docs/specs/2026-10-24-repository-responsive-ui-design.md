> Repository: `AahPlexX/wps`  
> Authority: `origin/main`  
> Documentation schema: `wps-v1`

# Repository Responsive UI Design

## Intent

Make responsive behavior a permanent, inspectable repository contract for every current and future client-facing WPS surface, while repairing only failures proven by a whole-client audit. The standard exists so another agent can continue from any stop without rediscovering layout policy or silently widening scope.

## Goals

- Base layout on available space, not device identity.
- Preserve all information and function across supported width, height, text-size, zoom, input, safe-area, long-string, and RTL conditions.
- Keep two-dimensional table/map behavior scoped to the region that needs it.
- Reuse the current CSS/Tailwind architecture, visual tokens, and centralized breakpoints.
- Preserve the existing Node suite as a regression gate and use rendered browser measurements for CSS layout behavior rather than adding a browser-test dependency.
- Record the effective production browser target instead of inventing a separate support matrix.

## Non-goals

- No redesign of the constitutional-field-guide visual system.
- No new dependency, CSS framework, reset, container-query system, or breakpoint framework.
- No device-model/user-agent/orientation sniffing.
- No political-data change.
- No attempt to represent automated browser checks as complete WCAG or assistive-technology certification.

## Existing architecture and audit result

The client is Vite + React + TypeScript + Tailwind utilities with shared conventional CSS in `src/styles.css` and a small existing component stylesheet. Responsive CSS is desktop-first and centralized at 1080px, 820px, and 640px. Vite 8's default Baseline Widely Available target is effective because `build.target` is not overridden.

The directory passed 320px reflow, 200% root text, and their combined case; its category strip is an intentional scoped horizontal scroller. The map passed 320px and 200% separately, 1024×256 short-height width containment, RTL/long-brand stress, and normal mobile/wide checks. The update dialog remained internally scrollable at 320×256 with 200% text.

The combined map case (320px width + 200% root text) exposed two defects: document width became 339px because the non-wrapping `View directory` link imposed excess min-content width, and map instruction text grew to 589px inside a 464px overflow-hidden globe stage, obscuring/clipping the map.

## Approaches considered

1. **Documentation-only governance.** Lowest code churn, but rejected because the audit has a reproducible current defect.
2. **Responsive rewrite/new layout framework.** Could normalize everything, but rejected because existing pages already pass most matrix cases and the rewrite would violate minimal/reversible scope and introduce unnecessary regression risk.
3. **Selected: codify + rendered-test + targeted repair.** Preserve existing breakpoints/visuals, use the live browser failure as the red behavioral test, repair only the verified map failure, harden existing safe-area/logical-property usage without changing successful LTR desktop geometry, then repeat the same browser matrix for green evidence. Existing Node tests protect application/data behavior.

## Implementation design

- Allow the map directory link to wrap instead of imposing a nowrap min-content width.
- Split globe instructions from the measured `.globe-stage` into a `.globe-shell`: desktop keeps the existing absolute overlay; the existing 640px narrow-layout media block places instructions in normal flow so large text cannot be clipped by the stage.
- Preserve canvas sizing against `.globe-stage` only; no globe projection/interaction code changes.
- Make page-shell safe-area protection account for both physical inline edges while keeping the same normal rectangular-viewport content width.
- Convert directional presentational properties such as text alignment, category divider edge, skip-link edge, and map-status edge to logical equivalents. Leave canvas/pointer coordinates physical.
- Keep existing Vite browser target and existing 1080/820/640 breakpoint structure.
- Add no browser-layout test dependency solely for CSS reflow; validate layout through the same measured live-browser seam that exposed the defect.

## Acceptance

WPS-023 is complete only after the original live 320px + 200% measurements turn green, `npm run validate` succeeds for 1.0.5, Pages deploys, and live QA repeats the responsive matrix. Any hardware-only safe-area or manual assistive-technology verification not exercised must be reported explicitly rather than inferred.
