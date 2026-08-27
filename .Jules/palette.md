## 2025-03-05 - ARIA Labels for Icon-Only Buttons
**Learning:** The Move Pet desktop frontend extensively relies on single-character emojis (like ×, 💬, 🔥) and inline SVGs for interactive icon-only buttons, but many of them were missing ARIA labels which prevents screen readers from understanding their purpose.
**Action:** Added `aria-label="Close"` to icon-only close buttons across toast notifications, modals, and overlays to improve accessibility. Will explicitly check for ARIA labels when creating or updating UI components containing icon-only buttons.
