# Changelog

# version 1.0

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
