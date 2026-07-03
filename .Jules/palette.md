## 2024-07-03 - App-wide Icon-only Buttons Missing ARIA Labels
**Learning:** The React frontend extensively uses single-character emojis (like ×, 💬) for interactive icon-only buttons across toasts, modals, and floating elements without providing screen reader text.
**Action:** Always add `aria-label` to these emoji/icon-only buttons (e.g., `aria-label="Close"`) to ensure they are accessible to screen reader users.
