## 2024-05-24 - Init
## 2026-07-23 - Icon-only button a11y
**Learning:** Move Pet relies heavily on icon-only buttons (using single-character emojis like ×, 💬, and inline SVGs) for UI interactions in toasts, modals, and task management bubbles. Many of these components lack descriptive aria-label attributes, causing an accessibility regression for screen readers.
**Action:** When adding new components such as toasts, modals, or floating bubbles with icon-only buttons, explicitly verify that all such action buttons have an `aria-label` prior to creating a PR to prevent widespread accessibility gaps.
