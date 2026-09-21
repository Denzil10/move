## 2024-05-24 - Accessibility: ARIA Labels for Icon-Only Close Buttons
**Learning:** This application heavily utilizes custom toast components and modal overlays which employ a bare '×' character for their close buttons. These lack aria-label attributes, making them inaccessible to screen readers which will just announce 'times' or 'multiply' without context.
**Action:** Add aria-label="Close" to all such icon-only close buttons in toasts and modals to ensure screen reader users can identify their function.
