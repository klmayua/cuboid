---
name: Institutional Glass Architecture
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394e'
  surface-container-lowest: '#060d20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3e'
  surface-container-highest: '#2d3449'
  on-surface: '#dbe2fd'
  on-surface-variant: '#bbcac6'
  inverse-surface: '#dbe2fd'
  inverse-on-surface: '#283044'
  outline: '#859490'
  outline-variant: '#3c4947'
  surface-tint: '#4fdbc8'
  primary: '#4fdbc8'
  on-primary: '#003731'
  primary-container: '#14b8a6'
  on-primary-container: '#00423b'
  inverse-primary: '#006b5f'
  secondary: '#e9c349'
  on-secondary: '#3c2f00'
  secondary-container: '#af8d11'
  on-secondary-container: '#342800'
  tertiary: '#6bd8cb'
  on-tertiary: '#003732'
  tertiary-container: '#44b5a8'
  on-tertiary-container: '#00423c'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#71f8e4'
  primary-fixed-dim: '#4fdbc8'
  on-primary-fixed: '#00201c'
  on-primary-fixed-variant: '#005048'
  secondary-fixed: '#ffe088'
  secondary-fixed-dim: '#e9c349'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#574500'
  tertiary-fixed: '#89f5e7'
  tertiary-fixed-dim: '#6bd8cb'
  on-tertiary-fixed: '#00201d'
  on-tertiary-fixed-variant: '#005049'
  background: '#0b1326'
  on-background: '#dbe2fd'
  surface-variant: '#2d3449'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  body-base:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: 0em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  data-mono:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: '1.0'
    letterSpacing: 0em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 16px
  margin: 32px
  container-max: 1600px
  density: compact
---

## Brand & Style
This design system establishes an environment of stability, exclusivity, and high-performance intelligence. It is engineered for institutional users who require high-density data visualization without sacrificing the aesthetic markers of prestige. 

The style utilizes **Institutional Glassmorphism**—a refined take on traditional glass effects that prioritizes legibility and structure over decorative blur. By layering translucent surfaces against a deep, abyssal background, the UI achieves a sense of immense digital depth, suggesting a secure and limitless data environment. The emotional response is one of quiet confidence, security, and elite accessibility.

## Colors
The palette is anchored by a deep, midnight foundation (#0B1326), providing a high-contrast stage for the sophisticated primary Sea Green (#14B8A6). This green is chosen for its associations with growth, clarity, and precision, moving away from standard "tech blue" toward a more bespoke, high-wealth aesthetic.

Gold (#D4AF37) is used as a "High-Value" accent. It must be applied sparingly—reserved for primary calls to action, premium status indicators, or "Grand Totals"—to maintain its psychological impact of prestige and exclusivity. Neutrals are strictly cool-toned to prevent the gold from feeling antiquated, ensuring the interface remains firmly modern and digital.

## Typography
The system utilizes **Inter** exclusively to leverage its exceptional legibility in high-density environments. The typographic scale is tightly controlled to accommodate complex data grids and multi-paneled dashboards.

Headlines use semi-bold weights with slight negative letter-spacing to create a "locked-in" institutional feel. Body text is set at 14px for optimal information density, while labels utilize uppercase styling and increased tracking to differentiate themselves from live data. Tabular numbers should be enabled via OpenType features to ensure vertical alignment in financial columns.

## Layout & Spacing
The layout follows a **12-column fluid grid** designed for 24-inch enterprise displays. A compact 4px base unit ensures that high volumes of information can be displayed on a single screen without vertical scrolling.

Margins are generous (32px) to frame the "glass" containers, while internal gutters remain tight (16px) to maximize data real estate. Component padding is categorized by "Density" levels, with the default set to "Compact" for institutional efficiency.

## Elevation & Depth
Depth is communicated through **Refractive Layering**. Rather than using traditional drop shadows, this system uses backdrop blurs (20px to 40px) and semi-transparent fills to stack information.

1.  **Base Layer:** The solid #0B1326 background.
2.  **Surface Layer:** A 4% Sea Green tint with an 8% white inner-stroke to simulate a glass edge.
3.  **Active/Floating Layer:** Increased transparency and a subtle 1px Gold border (#D4AF37 at 30% opacity) to signify focus or high-value selection.
    
Lighting is unidirectional, coming from the top-center, creating a subtle "sheen" on the top border of all glass panels.

## Shapes
The shape language is "Soft-Institutional." A 4px corner radius (level 1) is applied to all standard components. This provides a modern touch while maintaining the architectural rigor required for a professional tool. Larger containers and cards may use level 2 (8px) to soften the overall canvas, but buttons and inputs must remain crisp to imply precision.

## Components
- **Buttons:** Primary buttons use a Sea Green gradient with white text. High-value "Action" buttons (e.g., *Execute Trade*, *Approve*) use a subtle Gold fill with dark text. Ghost buttons use the 1px white border at 10% opacity.
- **Glass Cards:** Feature a `backdrop-filter: blur(20px)` and a 1px top-weighted border. The background fill must never exceed 10% opacity to ensure the "Glass Architecture" feel.
- **Data Grids:** Use zebra-striping with a 2% Sea Green tint. Headers are fixed with a more aggressive blur to maintain context during scroll.
- **Inputs:** Maintain a dark, recessed appearance with a 1px border that glows Sea Green on focus.
- **Status Indicators:** Use the Gold accent for "Premium" or "Verified" statuses. Standard "Success" remains the primary Sea Green to avoid color confusion.
- **Breadcrumbs & Navigation:** Utilize Inter's Medium weight; active states are indicated by a 2px Sea Green underline with a faint outer glow.