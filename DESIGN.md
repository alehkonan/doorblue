---
name: Door Blue Space
description: A spacious digital guide to a creative apartment in Tbilisi.
colors:
  accent: "#355f91"
  night-threshold: "#304a64"
  canvas: "#f8f1e6"
  atmospheric-peach-surface: "#e8d8c5"
  sand-secondary: "#d9b995"
  line: "#cdbdaa"
  warm-white: "#fff9ef"
  secondary-text: "#526a76"
  muted-foliage: "#677a78"
  warm-white-24: "rgb(255 249 239 / 24%)"
  warm-white-38: "rgb(255 249 239 / 38%)"
  warm-white-62: "rgb(255 249 239 / 62%)"
typography:
  display:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3.6rem, 8vw, 6rem)"
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "-0.035em"
  display-mobile:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3.25rem, 17vw, 4.6rem)"
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 5.5vw, 4.75rem)"
    fontWeight: 700
    lineHeight: 0.94
    letterSpacing: "-0.035em"
  headline-mobile:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 12vw, 3.75rem)"
    fontWeight: 700
    lineHeight: 0.94
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3vw, 2.75rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.035em"
  brand-title:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 800
    lineHeight: 1.5
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  body-large:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.1rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  lead:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.15rem, 2vw, 1.4rem)"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  feature-copy:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.35rem, 2.5vw, 2rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "normal"
  route-copy:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.05rem, 2vw, 1.35rem)"
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: "normal"
  door-lettering:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3.5rem, 8vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.78
    letterSpacing: "-0.04em"
  door-number:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 800
    lineHeight: 1.5
    letterSpacing: "normal"
  navigation:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  action:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 800
    lineHeight: 1.5
    letterSpacing: "normal"
  note:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.92rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 800
    lineHeight: 1.5
    letterSpacing: "normal"
  micro-label:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.72rem"
    fontWeight: 800
    lineHeight: 1.5
    letterSpacing: "normal"
rounded:
  tooltip: "0.4rem"
  control: "0.5rem"
  button: "0.7rem"
  panel: "1rem"
  route-marker: "50%"
spacing:
  micro: "0.35rem"
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1rem"
  action-inline: "1.1rem"
  lg: "1.5rem"
  xl: "2rem"
  shell-gutter: "1.5rem"
  grid-gap: "clamp(2rem, 6vw, 6rem)"
  hero-section: "clamp(3rem, 8vw, 6rem)"
  section: "clamp(5rem, 10vw, 9rem)"
  closing-section: "clamp(6rem, 12vw, 11rem)"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.warm-white}"
    typography: "{typography.action}"
    rounded: "{rounded.button}"
    padding: "0.85rem 1.1rem"
    height: "3.25rem"
  button-secondary:
    backgroundColor: "{colors.sand-secondary}"
    textColor: "{colors.accent}"
    typography: "{typography.body}"
    rounded: "{rounded.button}"
    padding: "0.8rem 1rem"
    height: "2.75rem"
  button-copy:
    backgroundColor: "transparent"
    textColor: "{colors.accent}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0.55rem 0.7rem"
  button-copy-hover:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.warm-white}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0.55rem 0.7rem"
  event-action-panel:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.warm-white}"
    padding: "clamp(1.5rem, 4vw, 2.5rem)"
  threshold-panel:
    backgroundColor: "{colors.atmospheric-peach-surface}"
    textColor: "{colors.accent}"
    padding: "1rem"
  arrival-door:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.warm-white}"
    typography: "{typography.door-lettering}"
    padding: "clamp(2rem, 5vw, 4rem)"
  donation-panel:
    backgroundColor: "{colors.atmospheric-peach-surface}"
    textColor: "{colors.accent}"
    rounded: "{rounded.panel}"
    padding: "2rem"
  tooltip:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.warm-white}"
    typography: "{typography.micro-label}"
    rounded: "{rounded.tooltip}"
    padding: "0.45rem 0.6rem"
---

# Design System: Door Blue Space

## Overview

**Creative North Star: "The Creative Apartment Guide"**

The interface should feel like entering the spacious apartment of a creative family through a watercolor interior study: calm, direct, welcoming, and full of room to look around. It guides rather than sells, using oversized type, architectural divisions, and generous warm-ivory space to turn practical information into a deliberate journey.

Its creativity is quiet rather than decorative. Muted cobalt-blue doors and type sit against warm paper, sand and peach architecture, and restrained blue-gray foliage notes. “The Route Becomes the Story” is the homepage’s shipped expression of this established world—not a replacement identity: information progresses from invitation, through current uses, into literal numbered wayfinding and an abstract arrival door.

**Key Characteristics:**

- Spacious, low-density compositions with one dominant message at a time.
- A watercolor-interior palette grounded by muted cobalt, warm ivory paper, peach plaster, sand, and blue-gray foliage.
- Oversized, tightly led Inter headlines paired with plainspoken body copy.
- Asymmetric editorial grids that resolve into a clear linear journey on small screens.
- Flat tonal depth: warm paper, atmospheric surfaces, dark thresholds, and dividers replace shadows.
- Literal route cues and abstract door forms used only when they reinforce place and arrival.

## Colors

The palette translates the supplied watercolor interior into semantic UI roles: warm ivory paper, a muted cobalt-blue door and type, sand-and-peach architecture, and quiet foliage blue-gray.

### Primary

- **Muted Cobalt Door** (`#355f91`): Accent, principal text, controls, doors, scrollbar, selection, focus, and browser-theme color. It anchors headlines, buttons, links, event panels, and the final arrival surface.
- **Night Threshold** (`#304a64`): The deeper blue route-stage surface behind directions, where Warm White and Warm Architectural Line become the foreground.

### Secondary

- **Atmospheric Peach Surface** (`#e8d8c5`): Watercolor-plaster field around the hero threshold and the established donation panel.
- **Sand Secondary** (`#d9b995`): Supporting action surface for secondary controls outside the homepage’s dominant route.
- **Muted Foliage** (`#677a78`): Reserved blue-gray green for subdued botanical or atmospheric detail; it is an implemented palette token, not a competing accent.

### Neutral

- **Warm Ivory Paper** (`#f8f1e6`): Default canvas and browser-scrollbar track, softly warm rather than stark.
- **Warm Architectural Line** (`#cdbdaa`): Section dividers, pale framing, and the subdued address line used on Night Threshold.
- **Warm White** (`#fff9ef`): Text and hardware details on muted-cobalt surfaces.
- **Secondary Blue-Gray Text** (`#526a76`): Supporting prose, notes, and compact facts on the warm ivory canvas.
- **Warm White 24** (`rgb(255 249 239 / 24%)`): Quiet internal borders on the arrival door and footer.
- **Warm White 38** (`rgb(255 249 239 / 38%)`): Route connector lines over Night Threshold.
- **Warm White 62** (`rgb(255 249 239 / 62%)`): Route-marker borders over Night Threshold.

### Named Rules

**The Watercolor Interior Rule.** Build hierarchy from Muted Cobalt Door, Night Threshold, Warm Ivory Paper, peach and sand architecture, and restrained blue-gray notes; preserve their muted relationship rather than introducing a sharper accent.

**The Quiet Creativity Rule.** Avoid neon nightlife color and polished corporate-SaaS gradients; creativity comes from watercolor warmth, space, scale, route, and the physical blue-door association.

## Typography

**Display Font:** Inter with `ui-sans-serif`, `system-ui`, and `sans-serif` fallbacks  
**Body Font:** Inter with `ui-sans-serif`, `system-ui`, and `sans-serif` fallbacks

**Character:** One sans-serif family keeps the guide direct and contemporary. Character comes from dramatic scale contrast, tight headline leading, and blunt stacked door lettering—not ornamental type. Inter remains the confirmed authority even though it is not bundled by `src/app.html`; a system fallback renders when Inter is unavailable.

### Hierarchy

- **Display** (700, `clamp(3.6rem, 8vw, 6rem)`, `0.9`, `-0.035em`): Homepage invitation, limited to about `8ch`.
- **Display Mobile** (700, `clamp(3.25rem, 17vw, 4.6rem)`, `0.9`, `-0.035em`): The display override at `38rem` and below, preserving the composed line breaks.
- **Headline** (700, `clamp(2.5rem, 5.5vw, 4.75rem)`, `0.94`, `-0.035em`): Major section openings.
- **Headline Mobile** (700, `clamp(2.5rem, 12vw, 3.75rem)`, `0.94`, `-0.035em`): The section-heading override at `38rem` and below.
- **Title** (700, `clamp(1.75rem, 3vw, 2.75rem)`, `1`, `-0.035em`): Coworking, rental, and similarly important subsection titles.
- **Door Lettering** (800, `clamp(3.5rem, 8vw, 6rem)`, `0.78`, `-0.04em`): Stacked words inside an arrival threshold only.
- **Door Number** (800, `0.8rem`, `1.5`): The small redundant address number inside the abstract hero door.
- **Feature Copy** (700, `clamp(1.35rem, 2.5vw, 2rem)`, `1.15`): Short, decisive action-panel statements.
- **Lead** (400, `clamp(1.15rem, 2vw, 1.4rem)`, `1.55`): The concise explanation beneath the display headline, capped at `36rem`.
- **Route Copy** (400, `clamp(1.05rem, 2vw, 1.35rem)`, `1.35`): Numbered physical directions.
- **Body Large** (400, `1.1rem`, `1.65`): Explanatory section copy, generally capped between `32rem` and `38rem`.
- **Body** (400, `1rem`, `1.5`): General visitor information.
- **Action** (800, `1rem`, `1.5`): Primary calls to action and strong text links.
- **Brand Title** (800, `1.05rem`, `1.5`, `-0.02em`): The official name in the header.
- **Navigation** (400, `0.9rem`, `1.5`): Quiet public-route labels inside `2.75rem` minimum-height targets.
- **Note** (400, `0.92rem`, `1.55`): Secondary operational context below the hero actions.
- **Label** (800, `0.85rem`, uppercase): Compact facts such as weekday hours and arrangement status.
- **Micro Label** (800, `0.72rem`, uppercase): Decorative route-rail labels only; never the sole label of an interactive control.

### Named Rules

**The Scale Creates Atmosphere Rule.** Use oversized, tightly led headings for identity; keep supporting copy modest and direct so the hierarchy never feels promotional.

**The Small Type Must Guide Rule.** The intentional `0.72rem` and `0.85rem` sizes belong to redundant route cues and compact facts; actions retain readable labels and at least `2.75rem`-high targets.

## Layout

The shared shell is centered at `72rem` with `1.5rem` inline gutters, tightening to `1rem` at `32rem`. Homepage sections use a twelve-part asymmetric model expressed as `7fr/5fr`, `8fr/4fr`, or `5fr/7fr` grids with `clamp(2rem, 6vw, 6rem)` gaps. Section padding is usually `clamp(5rem, 10vw, 9rem)`; the opening uses `clamp(3rem, 8vw, 6rem)`, and the closing breathes further at `clamp(6rem, 12vw, 11rem)`.

The hero is a `7fr/5fr` invitation and threshold with a viewport-aware minimum height between `42rem` and `50rem`. Event, use, and closing sections continue the asymmetry rather than resolving everything into cards. The journey deliberately escapes the shell with negative gutter margins, fills Night Threshold edge to edge, then recenters its heading and body to the shell’s content width.

Responsive behavior has four shipped thresholds:

- At `52rem`, hero, event, journey, and closing grids become single-column; use rows remain a compact `4fr/6fr` split and the threshold stays prominent.
- At `48rem`, the header stacks. Navigation remains one horizontal, edge-to-edge strip with overflow scrolling and hidden scrollbar rather than wrapping into a dense menu.
- At `38rem`, primary/closing actions become full-width, use rows and arrival copy become single-column, the hero route rail narrows, and directions read as one uninterrupted linear sequence.
- At `32rem`, the shell gutter tightens to `1rem` and the footer stacks.

**The Room Around the Message Rule.** Preserve generous empty space around short, important statements; do not fill the shell simply because width is available.

**The Route Resolves to Arrival Rule.** When a surface explains how to reach the place, let sequence, line, and numbering converge on a threshold or door; never use the route motif as unrelated decoration.

## Elevation & Depth

The system is intentionally shadowless. Depth comes from moving between Warm Ivory Paper, Atmospheric Peach Surface, Muted Cobalt Door, and Night Threshold; from sand accents and blue-gray supporting tones; from full-bleed section changes; and from `1px` dividers at structural edges. The hero door may rotate in perspective by `-7deg` when its paired primary action is hovered or keyboard-focused, but content and meaning never depend on the motion.

**The Apartment Plane Rule.** Keep surfaces shadowless at rest; separate them with color, distance, framing, and dividers so they feel like walls, paper, doors, and objects sharing one real place.

## Shapes

The form language is primarily architectural and rectilinear. Sections, action panels, door frames, use rows, and dark thresholds use square corners and straight `1px` boundaries. Soft curves are reserved for held or touched objects: action buttons use `0.7rem`, compact controls use `0.5rem`, tooltips use `0.4rem`, and the established donation panel uses `1rem`. Route markers and door handles are true circles.

**The Soft Object Rule.** Reserve rounded corners for controls, compact status objects, and circular wayfinding markers; keep narrative panels and thresholds rectilinear.

## Components

Components are direct and tactile. Their hierarchy comes from scale, color reversal, underlines, framing, and minimum target size—not shadows or ornamental chrome.

### Buttons and Action Links

- **Primary action:** Muted Cobalt Door fill, Warm White text, `1px` Muted Cobalt Door border, `0.7rem` radius, `0.85rem 1.1rem` padding, `3.25rem` minimum height, and `800` weight. Hover reverses to transparent with Muted Cobalt Door text over `220ms ease`.
- **Secondary action:** Sand Secondary with Muted Cobalt Door text, `0.7rem` radius, `0.8rem 1rem` padding, and `2.75rem` minimum height. Retain for supporting surfaces such as donations; it is not a competing homepage CTA.
- **Quiet action:** An underlined, `800`-weight Muted Cobalt Door text link with a `2.75rem` minimum target. Use it beside or beneath the dominant action.
- **Copy control:** Transparent with a `1px` Muted Cobalt Door border, `0.5rem` radius, and `0.55rem 0.7rem` padding; hover inverts to Muted Cobalt Door and Warm White.

### Cards / Containers

- **Event action panel:** A square Muted Cobalt Door block with Warm White content and `clamp(1.5rem, 4vw, 2.5rem)` internal padding. Its short feature statement leads; the underlined programme link follows.
- **Use row:** An open `5fr/7fr` information row bounded by Muted Cobalt Door rules, not a card. Supporting copy uses Secondary Blue-Gray Text. It becomes `4fr/6fr` at `52rem` and linear at `38rem`.
- **Donation panel:** The still-valid soft exception: Atmospheric Peach Surface, Muted Cobalt Door content, `1rem` radius, `2rem` padding, and Warm Architectural Line internal rules.
- **Shadow strategy:** None; see the Apartment Plane Rule.

### Navigation

The `5rem`-minimum header places the `800`-weight `1.05rem` official name opposite four `0.9rem` links: Events, Use the space, Find us, and Donations. Links use `0.65rem` inline padding, `2.75rem` minimum height, and a compact `0.35rem` inter-item gap. They are plain at rest and underline on hover. At `48rem`, the header stacks and the navigation becomes horizontally scrollable; do not replace it with wrapping or an unimplemented menu. No active-route treatment is currently established.

### Route Step

Each direction uses a `2.75rem` circular marker with a `1px` light border, tabular numerals, and an adjacent Route Copy instruction. A `1px` vertical line connects all but the final marker. Rows hold at least `5.5rem` so the route remains legible and calm; mobile preserves this exact linear order.

### Threshold and Door

The Atmospheric Peach hero threshold pairs a narrow vertical route rail with a Warm Architectural Line frame and a Muted Cobalt Door rectangle. Rail labels are uppercase Micro Labels in vertical writing mode. The door number sits at the upper left; a Warm White circular handle sits just right of center height. Hovering or keyboard-focusing the paired primary action opens the door by `perspective(70rem) rotateY(-7deg)` over `520ms cubic-bezier(0.22, 1, 0.36, 1)`.

The arrival threshold sits inside the Night Threshold journey and is larger, darker, and textual: stacked “Door / Blue / Space” lettering fills the Muted Cobalt Door above a two-column practical footer. Warm White alpha tokens at `24%`, `38%`, and `62%` create its borders, route connectors, and route markers. At `38rem`, that footer becomes linear and left aligned.

### Browser Surfaces and Focus

Set the browser theme color and scrollbar thumb to Muted Cobalt Door, the scrollbar track to Warm Ivory Paper, and selected text to Warm White on Muted Cobalt Door. All anchors and buttons receive a `3px` solid Muted Cobalt Door focus outline with `4px` offset. On Muted Cobalt Door or Night Threshold surfaces, links explicitly use `currentColor` for the outline so the ring remains visible. Smooth anchor scrolling is allowed, but it becomes immediate when `prefers-reduced-motion: reduce`; door and action transitions are disabled under the same preference.

**The Focus Is Structural Rule.** Keyboard focus must remain at least as explicit as hover, including the door response paired to the primary action; never remove the visible ring because a component already changes color.

## Do's and Don'ts

### Do:

- **Do** let one oversized headline establish each section before introducing practical details.
- **Do** use Muted Cobalt Door, Night Threshold, Warm Ivory Paper, peach and sand architecture, Warm White alpha, and blue-gray supporting tones as one restrained watercolor-interior palette.
- **Do** use asymmetric desktop grids that become an intentional single reading path at the documented breakpoints.
- **Do** preserve the exact route-step order, connected markers, and final blue-door payoff when presenting arrival directions.
- **Do** keep all interactive targets at least `2.75rem` high and retain the `3px`/`4px` focus treatment.
- **Do** keep content fully understandable when motion is reduced or unavailable.

### Don't:

- **Don't** introduce shadows as the default way to separate surfaces.
- **Don't** make the interface resemble a corporate SaaS dashboard or a neon nightlife promotion.
- **Don't** add ornamental bohemian decoration to signal creativity; use scale, space, architecture, and content instead.
- **Don't** turn the homepage into a field of rounded cards; route panels and thresholds are intentionally square.
- **Don't** wrap the small-screen navigation or invent a menu; preserve its horizontal overflow behavior until navigation is deliberately redesigned.
- **Don't** introduce an unrelated saturated accent or cool the canvas back toward blue-gray without deliberately revisiting the Watercolor Interior Rule.
