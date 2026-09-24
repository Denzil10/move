## 2026-09-24 - Add aria-labels to icon-only close buttons
**Learning:** The React frontend extensively relies on single-character emojis (like ×) and HTML entities (&times;) for interactive icon-only close buttons in toasts, modals, and overlays, but many lacked descriptive aria-labels, creating a widespread accessibility gap for screen readers.
**Action:** Explicitly verify that all such action buttons have an `aria-label="Close"` prior to creating PRs.
