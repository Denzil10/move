## 2024-07-20 - Icon-Only Button Accessibility Pattern
**Learning:** The Move Pet desktop app relies extensively on single-character emojis (like ×) and inline SVGs for interactive icon-only buttons across various components like toasts, modals, and floating bubbles.
**Action:** When adding new components such as toasts, modals, or floating bubbles, explicitly verify that all such action buttons have an `aria-label` prior to creating a PR to prevent widespread accessibility gaps.
