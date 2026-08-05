## 2024-05-18 - Missing ARIA Labels on Icon Buttons
**Learning:** The React frontend extensively relies on single-character emojis (like ×) and inline SVGs for interactive icon-only buttons (such as in toasts and modals), which are frequently missing aria-labels causing accessibility gaps.
**Action:** Add aria-label attributes to all such action buttons and explicitly verify prior to creating PRs.
