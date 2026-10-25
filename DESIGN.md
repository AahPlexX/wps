---
name: World Political Structures
description: A constitutional field guide presented as a diplomatic atlas.
colors:
  civic-paper: "#f7f7f4"
  data-surface: "#ffffff"
  constitutional-ink: "#18231f"
  muted-ink: "#66706c"
  rule: "#d9ddd8"
  civic-accent: "#385d50"
  monarchy: "#b18735"
  collective: "#4d6f9b"
  supreme: "#765b8d"
  transitional: "#a45b48"
  focus: "#005fcc"
typography:
  display:
    fontFamily: "Iowan Old Style, Palatino Linotype, Book Antiqua, Georgia, serif"
    fontWeight: 600
    lineHeight: 0.95
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Avenir Next, Avenir, Segoe UI, system-ui, sans-serif"
    fontWeight: 400
    lineHeight: 1.58
rounded:
  control: "0.45rem"
  globe: "16px"
spacing:
  gutter: "clamp(1rem, 3vw, 3rem)"
components:
  control:
    backgroundColor: "{colors.data-surface}"
    textColor: "{colors.constitutional-ink}"
    rounded: "{rounded.control}"
    height: "46px"
---

# Design System: World Political Structures

## Overview

**Creative North Star: “The Constitutional Field Guide”**

The interface borrows from diplomatic atlases, government directories, and constitutional charts. It is quiet, reference-first, and information-dense without looking bureaucratic. One memorable element—the globe—carries the geographic experience while every surrounding control remains disciplined.

## Colors

The page uses civic paper neutrals and dark green-black ink. Category colors encode political-assignment classes and do not become decoration.

## Typography

Display type uses an old-style serif stack for country and section hierarchy. UI controls and body copy use a restrained humanist/system sans stack. Headlines stay balanced, labels use sentence case, and body measure remains below 80 characters where prose is primary. Text sizing uses relative units so browser/user text settings remain effective.

## Layout

The directory uses wide reference bands and a grouped table that becomes stacked country records when available space is too narrow for useful tabular reading. Stacked records use shrinkable proportional label/value tracks so increased text size cannot reserve the full row for the label and collapse the value track. The map uses a globe/detail split while space permits and stacks globe then detail below the existing content-failure breakpoint. Page gutters are fluid and safe-area aware.

Responsive behavior is governed by `docs/RESPONSIVE_UI.md`. The current stylesheet is desktop-first and centralizes its content-driven `max-width` breakpoints at 1080px, 820px, and 640px in `src/styles.css`; do not duplicate those thresholds in component files or add named-device breakpoints. The effective production browser target is Vite 8's unoverridden `baseline-widely-available` target: Chrome 111+, Edge 111+, Firefox 114+, Safari 16.4+, and iOS 16.4+.

Use logical properties for directional layout where physical coordinates are not intrinsic to an interaction. With `viewport-fit=cover`, content gutters and fixed/focusable UI must honor all relevant safe-area edges. Wide tables and the globe may own contained two-dimensional interaction/scroll behavior; surrounding prose, controls, status/instruction text, and detail content must still reflow without forcing page-level two-dimensional scrolling.

## Elevation & Depth

The system is flat by default. Borders, tonal surfaces, and the rendered globe establish hierarchy. Backdrop blur is reserved for sticky controls or map instruction overlays where content remains legible behind them. A solid translucent backdrop is permitted for the deployment-update modal because it must temporarily block interaction until the user chooses Update or Cancel.

## Shapes

Controls use restrained rounded corners. The globe stage has a 16px radius on larger screens and 12px when the narrow-layout rules apply. Data rows are not individual floating cards.

## Components

Buttons and links use the same dark-ink active state. Every interactive element has a visible focus ring. Category buttons encode selected state with filled constitutional ink; the globe uses category color only on geopolitical geometry.

The deployment-update prompt uses the native modal `dialog` element, is explicitly centered within the viewport, reuses the paper/ink/accent tokens, and contains only a short update label, the available version, and the `Update` and `Cancel` actions. It must remain within a one-rem viewport gutter on phones and must preserve access to both actions at short heights and increased text sizes, using internal scrolling when necessary.

## Do's and Don'ts

- Preserve open reference layouts instead of repeating generic cards.
- Reserve category colors for data meaning.
- Keep the 3D globe as the map page’s dominant visual element.
- Keep labels in sentence case and actions explicit.
- Keep deployment update prompts concise: available version plus Update/Cancel only.
- Reflow or restack controls/instructions when available space or text scaling makes overlays or fixed rows obscure content.
- Keep map/table two-dimensional behavior contained to the map/table region rather than the page.
- Do not infer layout from device model, orientation name, or user agent.
- Do not add external source links or citation chrome to the public client.
