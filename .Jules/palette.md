## 2024-05-18 - Missing ARIA Labels on Icon-only Buttons
**Learning:** Found a widespread pattern in this React app where icon-only buttons (especially close "×" buttons in modals, toasts, and overlays) lack descriptive `aria-label` attributes, making them inaccessible to screen readers.
**Action:** When adding new components such as toasts, modals, or floating bubbles, explicitly verify that all such action buttons have an `aria-label` to prevent accessibility gaps.
