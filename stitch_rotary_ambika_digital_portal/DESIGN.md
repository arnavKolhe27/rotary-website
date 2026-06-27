---
name: Precision & Purpose
colors:
  surface: '#f7f9ff'
  surface-dim: '#d0dbea'
  surface-bright: '#f7f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#edf4ff'
  surface-container: '#e4effe'
  surface-container-high: '#dee9f8'
  surface-container-highest: '#d8e3f2'
  on-surface: '#121d27'
  on-surface-variant: '#444652'
  inverse-surface: '#27313d'
  inverse-on-surface: '#e8f2ff'
  outline: '#747683'
  outline-variant: '#c4c6d4'
  surface-tint: '#3959b0'
  primary: '#001d59'
  on-primary: '#ffffff'
  primary-container: '#003087'
  on-primary-container: '#7f9df8'
  inverse-primary: '#b4c5ff'
  secondary: '#00629e'
  on-secondary: '#ffffff'
  secondary-container: '#60b4ff'
  on-secondary-container: '#004470'
  tertiary: '#1f2325'
  on-tertiary: '#ffffff'
  tertiary-container: '#34383a'
  on-tertiary-container: '#9ea1a4'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#1c4197'
  secondary-fixed: '#cfe5ff'
  secondary-fixed-dim: '#9acbff'
  on-secondary-fixed: '#001d34'
  on-secondary-fixed-variant: '#004a78'
  tertiary-fixed: '#e0e3e6'
  tertiary-fixed-dim: '#c4c7ca'
  on-tertiary-fixed: '#191c1e'
  on-tertiary-fixed-variant: '#44474a'
  background: '#f7f9ff'
  on-background: '#121d27'
  surface-variant: '#d8e3f2'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '800'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.25'
    letterSpacing: 0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.3'
    letterSpacing: 0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 24px
  margin-x: 48px
  section-padding-y: 128px
  stack-gap: 16px
---

## Brand & Style

This design system blends high-tech fintech precision with the humanitarian prestige of the Rotary Club. The aesthetic is rooted in **Minimalism** and **Corporate Modernism**, prioritizing clarity, trust, and efficiency. By utilizing expansive whitespace and a restrained color palette, the UI evokes a sense of organized professionalism and modern philanthropy.

The emotional response should be one of "effortless authority"—a platform that feels both technologically advanced and deeply reliable. Design elements are characterized by high-contrast typography, generous breathing room, and a surgical attention to alignment.

## Colors

The palette is strictly anchored in blue-chip fintech tones to establish immediate credibility.

- **Canvas**: Pure White (#FFFFFF) serves as the foundation for all views, ensuring maximum clarity.
- **Primary**: Deep Blue (#003087) is reserved for authoritative elements, primary headings, and brand-critical touchpoints.
- **Accent**: Vibrant Blue (#0079C1) is used for calls to action, interactive states, and highlighting key progress metrics.
- **Neutrals**: Soft Gray (#F5F7FA) provides subtle structural grounding for sections, while Pale Blue (#E5F0FF) is used for soft backgrounds behind secondary content or highlighted list items.

## Typography

The typography system is built exclusively on **Inter**, utilizing its systematic, utilitarian nature to provide a "tech-first" feel. 

- **Headings**: Heavy weights (Bold/ExtraBold) are used to create a clear information hierarchy. High-level display titles use tighter tracking for a modern look, while standard headlines use slightly increased letter spacing for a premium, editorial feel.
- **Body Text**: Line heights are intentionally generous (1.5x - 1.6x) to ensure long-form content is digestible and the UI feels "airy."
- **Labels**: Small caps or uppercase treatments with tracking are used for metadata and category tags to differentiate them from functional body text.

## Layout & Spacing

This design system employs a **Fixed Grid** philosophy for desktop to maintain a controlled, premium reading experience, transitioning to a fluid layout for mobile devices.

- **Scale**: The system uses an aggressive padding scale. Standard sections should utilize `128px` (py-32) vertical padding to create a luxurious sense of space.
- **Grid**: A 12-column grid with `24px` gutters. Content blocks typically span 6, 8, or 12 columns to maintain focus.
- **Mobile**: Breakpoints at 768px (Tablet) and 375px (Mobile). On mobile, horizontal margins reduce to 20px and vertical section spacing reduces to 64px.

## Elevation & Depth

To maintain a "High-Tech Minimalist" look, the design system avoids traditional heavy shadows.

- **Flat Foundation**: Surfaces are primarily flat, using color floods (White, Soft Gray, Pale Blue) to define zones.
- **Tonal Layers**: Hierarchy is created through background shifts rather than z-index elevation. For example, a card may sit on a `#F5F7FA` section background as a pure white object.
- **Interactive Depth**: Only upon hover or active states should a subtle, ultra-diffused shadow (`0 4px 20px rgba(0, 48, 135, 0.08)`) be applied to indicate tactility.
- **Dividers**: Use 1px solid lines in `#E5F0FF` for subtle separation without breaking the visual flow.

## Shapes

The shape language is characterized by large, friendly radii that soften the corporate precision of the typography.

- **Containers**: All major cards, content blocks, and modals use `rounded-2xl` (1rem / 16px) or larger to create a modern, approachable container style.
- **Buttons**: All buttons must be fully pill-shaped (rounded-full) to mirror fintech industry standards for action-oriented elements.
- **Inputs**: Form fields should follow the `rounded-lg` (0.5rem / 8px) standard to maintain a slightly more structured look than buttons.

## Components

- **Buttons**: Pill-shaped. Primary buttons use Deep Blue (#003087) with white text. Secondary buttons use a White background with a Thin Blue border or Vibrant Blue text. Large padding (px-8, py-4) is mandatory.
- **Cards**: Pure white backgrounds with `rounded-2xl` corners. No borders unless on a white background, in which case use a 1px border of `#E5F0FF`.
- **Inputs**: Minimalist style. 1px border in Soft Gray. On focus, the border transitions to Vibrant Blue with a soft 2px outer glow.
- **Chips/Badges**: Small pill shapes using Pale Blue backgrounds and Deep Blue text. Used for status or category indicators.
- **Lists**: High-density information should be avoided. List items should have ample vertical padding (16px+) and be separated by thin, elegant lines.
- **Progress Indicators**: Specifically for fundraising or project milestones, use thick, rounded bars with the Vibrant Blue accent color against a Soft Gray track.