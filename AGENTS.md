# AI Agent Guide: Fox Sports "Vanguard Elite" Design System

> **IMPORTANT:** This project follows a strict, custom design system. All AI agents MUST adhere to these rules without exception.

## 1. Vision & Identity: "Vanguard Elite"
- **Concept:** Minimalist Tech-Luxury.
- **Vibe:** Sharp, High-Performance, Professional, Snappy.
- **Inspiration:** Nike Pro, Apple Sports, Aerospace HUDs.

## 2. Core Rules of Sharpness (Non-Negotiable)
- **NO BORDER RADIUS:** All elements MUST have `border-radius: 0`. Use `rounded-none` or ensure global CSS overrides are respected.
- **NO SHADOWS:** Do not use `shadow-*` classes. Use 1px solid borders (`vanguard-border`) to define containers.
- **1px Precision:** Use 1px solid black borders for all UI structures.

## 3. Color Palette
- **Primary Background:** `#FFFFFF` (White)
- **Primary Foreground:** `#000000` (Black)
- **Accent (Action):** `#FF5F00` (Vanguard Orange / Neon)
- **Subtle Background:** `#F5F5F5` (Subtle Grey for sectioning)

**Tailwind Tokens:**
- Colors: `vanguard-orange`, `vanguard-black`, `vanguard-white`, `vanguard-grey`.
- CSS Variables: `--color-vanguard-orange`, `--color-vanguard-black`, etc.

## 4. Typography (Geist Variable)
- **Headings (H1-H6):** `font-black uppercase italic tracking-tighter`.
- **Body:** `font-medium text-black/80`.
- **Labels/Nav:** `uppercase font-bold tracking-[0.3em] text-[10px]`.

## 5. Components & Utilities
- **Buttons:** Sharp corners, black background, white text. Hover state: Vanguard Orange.
- **Transitions:** Must be "Snappy". Use `.snappy-transition` (cubic-bezier) for instant feedback.
- **HUD Elements:** Use thin 1px lines and wide-spaced labels to create a technical/aerospace feel.

## 6. Implementation Reference
- **Global CSS:** `frontend/src/index.css` (Contains `@theme` and base overrides).
- **Config:** `frontend/tailwind.config.cjs`.
- **Global Reset:** A global `* { border-radius: 0 !important; }` is active in `index.css`. DO NOT attempt to bypass this.

---
*When building new components, always ask yourself: "Is it sharp? Is it high-contrast? Is it snappy?"*
