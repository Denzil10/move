## 2024-07-08 - Icon-Only Buttons Missing ARIA Labels
**Learning:** The Move Pet desktop frontend extensively uses single-character emojis (like ×) and inline SVGs for interactive icon-only buttons (such as close buttons in toasts and action buttons in task management bubbles) without providing accessible names, causing a widespread accessibility gap for screen reader users.
**Action:** Ensure all such interactive components include descriptive `aria-label` attributes (e.g., `aria-label="Close"`, `aria-label="Complete task"`) prior to creating a PR.
