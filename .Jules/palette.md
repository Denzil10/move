## 2024-05-15 - Interactive icon-only buttons require explicit aria-labels
**Learning:** This application heavily relies on single-character emojis (like "×") and inline SVGs for interactive icon-only buttons (such as in toasts and task bubbles).
**Action:** When adding or modifying these components, always ensure they have an explicit `aria-label` attribute to be accessible for screen readers, as the visual icons alone do not provide enough context.
