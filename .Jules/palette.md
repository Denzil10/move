## 2024-05-24 - Missing ARIA Labels on Icon-Only Close Buttons
**Learning:** The React frontend extensively relies on single-character emojis (like ×) and HTML entities (&times;) for interactive icon-only close buttons in toasts and overlays without providing accessible names, causing screen readers to read the character literally or ignore it.
**Action:** Always verify that icon-only action buttons (such as those in toasts, modals, or floating bubbles) have an explicit `aria-label="Close"` prior to creating a PR to prevent widespread accessibility gaps.
