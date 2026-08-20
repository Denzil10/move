## 2026-08-20 - Icon-Only Button Accessibility Pattern
**Learning:** The React frontend extensively relies on single-character emojis (like ×, 💬, 🔥) for interactive icon-only buttons, which creates accessibility gaps for screen readers when aria-labels are missing.
**Action:** Explicitly verify that all such action buttons have an `aria-label` when modifying or creating new UI components (like toasts, modals, or bubbles).
