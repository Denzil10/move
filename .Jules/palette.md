## 2024-06-22 - Add ARIA Labels to Icon-Only Buttons
**Learning:** The Move Pet React frontend extensively relies on single-character emojis (like ×) for interactive icon-only buttons (e.g. close buttons in toasts and panels). Screen readers cannot interpret these meaningfully.
**Action:** When adding new components such as toasts, modals, or floating bubbles, explicitly verify that all such action buttons have a descriptive `aria-label` prior to creating a PR to prevent widespread accessibility gaps.
