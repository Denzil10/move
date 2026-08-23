## 2026-08-23 - Missing ARIA Labels on Icon Buttons
**Learning:** The React frontend extensively relies on single-character emojis (like ×, 💬, 🔥) and inline SVGs for interactive icon-only buttons, but none of these currently have `aria-label` attributes.
**Action:** Add `aria-label="Close"` to all close buttons in toast notifications and modal dialogs to ensure screen reader accessibility.
