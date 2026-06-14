## 2026-06-14 - App-Specific Close Button A11y Pattern
**Learning:** The Move Pet desktop app relies heavily on single-character emojis (like '×', '💬', '🔥') and inline SVGs for interactive icon-only buttons (especially in modals, toasts, and floating bubbles). This causes a widespread accessibility gap where screen readers cannot interpret the intended action.
**Action:** When adding new components such as toasts, modals, or floating bubbles, explicitly verify that all such action buttons have an `aria-label` (e.g., `aria-label="Close"`) prior to PR creation.
