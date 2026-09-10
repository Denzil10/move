## 2026-09-10 - Accessibility for Icon-only Buttons
**Learning:** The application heavily relies on single-character emojis like '×' and SVG icons for interactive icon-only buttons (such as close buttons in modals/toasts and action buttons). These inherently lack readable text, creating accessibility issues for screen readers.
**Action:** Explicitly add descriptive `aria-label` attributes to all such icon-only buttons to ensure proper accessibility without visually altering the UI.
