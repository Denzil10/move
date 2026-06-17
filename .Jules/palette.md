## 2026-06-17 - Icon-Only Button Accessibility Pattern
**Learning:** This application relies extensively on single-character emojis (like `×` for closing toasts and modals) to act as interactive icon-only buttons. Many of these elements lack `aria-label` attributes out of the box.
**Action:** When creating new components (like toasts, modals, or bubbles) that include these emoji-based action buttons, explicitly add descriptive `aria-label`s (e.g., `aria-label="Close"`) to ensure the application remains accessible to screen readers.
