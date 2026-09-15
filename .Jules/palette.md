## 2024-05-23 - App-wide Icon-only Buttons
**Learning:** This app frequently relies on single-character emojis/symbols (like `×` or `&times;`) for close/cancel buttons across numerous Modals and Toasts without built-in accessibility labels, rendering them silent or confusing for screen reader users.
**Action:** When adding new popups, toasts, or modals using this design system, always explicitly add `aria-label="Close"` (or similar semantic text) to ensure these interactive elements are accessible.
