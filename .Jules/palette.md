## 2026-09-29 - Adding ARIA labels to icon-only close buttons
**Learning:** The frontend desktop application heavily relies on icon-only buttons for interactions like closing toasts, modals, overlays, and task management bubbles. Many of these buttons use '×', '&times;', or emoji without `aria-label` attributes, leading to accessibility gaps for screen readers.
**Action:** Add descriptive `aria-label` attributes (e.g., `aria-label="Close"`) to these icon-only buttons to enhance accessibility, keeping code changes focused and strictly following the micro-UX constraint (<50 lines).
