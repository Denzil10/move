## 2024-05-24 - Accessibility on Icon-Only UI Buttons
**Learning:** The application heavily relies on single-character emojis (like ×, 💬, 🔥) and inline SVGs for interactive icon-only buttons in modals, toasts, and floating overlays. These buttons previously lacked `aria-label` attributes, rendering them invisible or confusing to screen readers.
**Action:** Consistently ensure that all new micro-components (toasts, modals, overlays) explicitly include `aria-label` on any button that does not contain descriptive visible text.
