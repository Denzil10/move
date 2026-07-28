## 2024-10-24 - Missing ARIA Labels on Icon-Only Buttons
**Learning:** The React frontend extensively relies on single-character emojis (like ×, 💬, 🔥) and inline SVGs for interactive icon-only buttons, particularly for closing toasts and floating bubbles. These consistently lack `aria-label` attributes, creating widespread accessibility gaps for screen reader users.
**Action:** When adding new components such as toasts, modals, or floating bubbles, explicitly verify that all such action buttons have a descriptive `aria-label` prior to creating a PR to prevent accessibility regressions.
