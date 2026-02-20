# Valentine Timeline Website Specification

## 1. Project Overview

A two-page React-based Valentine memory website deployed via GitHub
Pages. Theme: Minimal, emotional, letter-paper style.

------------------------------------------------------------------------

## 2. Tech Stack

-   React (CRA or Vite)
-   CSS Scroll Snap
-   GitHub Pages Deployment
-   Plain CSS / Tailwind (optional)

------------------------------------------------------------------------

## 3. Color & Design Concept

-   Background: Beige (Letter paper)
-   Text: Black
-   Style: Minimal, Emotional, Clean
-   Photo Border: Thin black line
-   No background behind text

------------------------------------------------------------------------

## 4. Page Structure

### Page 1: Landing Page (/)

#### Layout

-   Center aligned
-   Beige background

#### Elements

-   Title: "Would you be my Valentine 💌"
-   Button: "Yes"

#### Behavior

-   Clicking "Yes" navigates to Page 2

------------------------------------------------------------------------

### Page 2: Timeline Page (/story)

#### Core Concept

Horizontal scroll-based storytelling timeline using Scroll Snap.

Scroll Direction: Left → Right

------------------------------------------------------------------------

## 5. Timeline Flow

Each year repeats the following pattern:

\[ Year Slide \] → \[ Main Photo Slide \] → \[ Valentine Photo Slide \]
→ Next Year

Example:

2021 → Photo → Valentine → 2022 → Photo → Valentine → ... → 2026

------------------------------------------------------------------------

## 6. Slide Types

### 6.1 Year Slide (Text Only)

Purpose: Chapter / Section intro

Content: - Large centered year text (e.g. 2021) - Optional small
subtitle

Style: - Big serif font - Centered - High whitespace

------------------------------------------------------------------------

### 6.2 Main Photo Slide

Purpose: Represent that year's main memory

Content: - One photo (centered) - Small caption text

Style: - Image with thin border - Width: \~60vw (mobile \~80%) - Caption
aligned left or right - No background

------------------------------------------------------------------------

### 6.3 Valentine Photo Slide

Purpose: Show Valentine's Day memory

Content: - Valentine photo - Date caption (e.g. 2021.02.14)

Style: - Same as Main Photo - Optional warmer tone

------------------------------------------------------------------------

## 7. Scroll Behavior

-   Horizontal scroll
-   Scroll Snap enabled
-   Snap alignment: center
-   Smooth scrolling
-   Touch and mouse supported

------------------------------------------------------------------------

## 8. Layout Structure

Each slide:

-   Width: 100vw
-   Height: 100vh
-   Center aligned content

Container:

-   display: flex
-   overflow-x: auto
-   scroll-snap-type: x mandatory

------------------------------------------------------------------------

## 9. Data Structure Example

``` js
const slides = [
  { type: "year", year: 2021 },

  {
    type: "photo",
    img: "/2021-main.jpg",
    caption: "First trip"
  },

  {
    type: "valentine",
    img: "/2021-v.jpg",
    caption: "2021.02.14"
  },
];
```

------------------------------------------------------------------------

## 10. UX Flow

1.  Landing → Emotional entry
2.  Button click → Story begins
3.  Scroll → Time travel experience
4.  Final year → Emotional climax

------------------------------------------------------------------------

## 11. Performance & Optimization

-   Images optimized (WebP recommended)
-   Max 600KB per image
-   Lazy loading
-   Preload first 2 slides

------------------------------------------------------------------------

## 12. Deployment

-   Build React app
-   Configure homepage in package.json
-   Deploy with gh-pages

------------------------------------------------------------------------

## 13. Optional Enhancements

-   Fade-in animations
-   Soft background music
-   Typewriter effect on Year slides
-   Easter egg on last slide
-   D-Day counter on final slide

------------------------------------------------------------------------

## 14. Target Experience

Goal: Create an interactive digital love letter.

Keywords: - Emotional - Minimal - Personal - Memorable - Timeless
