# version 1.1

|

## 1.1.2

- vibe: Broadened project cards — grid max-width 1200→1400px, card min-width 300→380px (desktop) and 300→340px (tablet).

## 1.1.1

- fix: Refined section heights and paddings to fit strictly within 100vh.
- fix: Updated `useFullPageScroll` observer to use `preventDefault: false` for better compatibility.
- fix: Removed `fp-overflow` from Projects and Experience sections for a cleaner 100vh snap flow.
- fix: Temporarily removed Footer section to resolve overflow clipping issues.
- feature: Added "Achievements" section to the core navigation and fullpage scroll flow.
- docs: Updated features list and README versioning.

## 1.1.0

- vibe: Initialized `.agent-persistence` for session state tracking.
- vibe: Updated `.gitignore` to exclude agent persistence and test artifacts.
- feature: Bootstrapped project MVP analysis and verified dependencies.

## 1.0.4

- fix: Section content horizontally centered in all fullpage sections (added justify-content + width: 100%)
- fix: Scroll navigation restored — corrected GSAP Observer direction, lowered tolerance, changed target to documentElement
- fix: Removed position: fixed from body that was killing scroll events
- fix: Content clipping resolved for Projects, Contact, Achievements sections via fp-overflow internal scroll
- fix: Footer now embedded inside Contact section instead of unreachable standalone fp-section
- fix: Dot navigation button sizing — added explicit appearance/sizing resets
- fix: Safety timeout on isAnimating prevents scroll deadlocks
- fix: Section headings clipped behind navbar — added 80px padding-top to fp-overflow containers
- feature: Playwright E2E test suite (12 tests) covering alignment, navigation, clipping, footer, and dot nav
- change: Reduced Projects/Contact section padding from 6rem to 2rem for fullpage fit

## 1.0.3

- feature: Full-page snap scroll system using GSAP Observer — each scroll tick transitions to next/previous full-screen section
- feature: Section dot navigation on right edge with hover labels and active state highlighting
- feature: Counter-up animation on About section stats (20%, 25%, 7%, 600+) — numbers animate from 0 when section enters viewport
- feature: Active nav link highlighting based on current fullpage section
- feature: Keyboard navigation support (ArrowUp/Down, PageUp/Down, Home/End) for fullpage scroll
- change: Sections restructured into fp-section wrappers; section IDs moved to parent containers
- change: Navigation derives scrolled/active state from section index instead of scroll offset
- change: Disabled native smooth scroll in favor of GSAP-powered transitions

## 1.0.2

- feature: Section entrance animations via CSS-based fp-visible/fp-animate system

## 1.0.1

- change: Moved project data from `Projects.jsx` to `src/data/projects.json` for better maintainability.
