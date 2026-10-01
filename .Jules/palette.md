## 2024-10-24 - Missing ARIA Labels on Emoji Icon Buttons
**Learning:** The React frontend extensively relies on single-character emojis (like ×, 💬, 🔥) for interactive icon-only buttons in toasts and overlays, which currently lack accessible names for screen readers.
**Action:** Always verify and add descriptive `aria-label` attributes to these icon-only emoji buttons (e.g., `aria-label="Close"`) across all new and existing components.
