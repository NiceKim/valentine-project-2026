# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server:** `npm run dev` (Vite, hot-reloads at localhost:5173)
- **Build:** `npm run build` (outputs to `dist/`)
- **Lint:** `npm run lint` (ESLint with React hooks purity rules)
- **Preview production build:** `npm run preview`
- **Deploy:** `gh-pages` (configure `homepage` in package.json first)

## Architecture

Two-page React (Vite + React 19) Valentine's website using React Router. Theme: minimal, emotional, letter-paper style.

### Routing (`src/App.jsx`)

- `/` — Landing page (interactive Valentine's question)
- `/story` — Timeline page (horizontal scroll-snap storytelling)

### Pages (`src/pages/`)

- **LandingPage** — "Would you be my Valentine?" prompt with a "Yes" button (navigates to `/story`) and a "No" button that dodges clicks and cycles through escalating pleas (`NO_TEXTS`). The "Yes" button grows with each "No" click.
- **StoryPage** — Horizontal scroll-snap timeline. Renders slides from `src/data/slides.js`. Four slide types: `year` (large serif text), `photo` (main memory), `valentine` (Valentine's Day memory), `camera` (live webcam). Each slide is 100vw x 100vh with CSS scroll-snap (`scroll-snap-type: x mandatory` on the container, `scroll-snap-align: start` on each slide). Also supports mouse drag and touch swipe with a JS `snapToNearest` fallback.

### Data (`src/data/slides.js`)

Slide array defining the timeline flow: `[Year] → [Photo] → [Valentine] → next year...` from 2021–2026. Edit this file to change captions or add/remove years.

### Photos (`public/photos/`)

Place images here following the naming convention: `{year}-main.jpg` and `{year}-v.jpg`. Images should be optimized (WebP recommended, max 600KB each). Photos are lazy-loaded.

### Styles

- `src/index.css` — Global styles, Google Fonts (Dancing Script, Quicksand), beige background
- `src/pages/LandingPage.css` — Landing page button and title styles
- `src/pages/StoryPage.css` — Timeline horizontal scroll with CSS scroll-snap, photo borders, mobile breakpoint at 768px

## Design Conventions

- Unified letter-paper style across both pages: beige (`#f5f0e8`) background, black (`#1a1a1a`) text, Georgia serif typography
- Minimal and emotional — no animations, no floating elements, no background gradients
- Buttons: transparent with thin black borders, invert on hover
- Photos: thin black border, no background behind text
