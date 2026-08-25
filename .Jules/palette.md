## 2026-08-25 - App-Specific Pattern: Icon-only buttons lack ARIA labels
**Learning:** The application heavily relies on single-character emojis (like ×, 💬, &times;) for interactive icon-only buttons (toasts, modals). These currently lack `aria-label` attributes, creating significant accessibility barriers for screen reader users.
**Action:** Add descriptive `aria-label` attributes to all existing icon-only buttons across components to ensure WCAG 2.5.3 compliance without altering visual layout.
