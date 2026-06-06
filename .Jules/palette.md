## 2025-06-06 - Add ARIA Labels to Icon-Only Close Buttons
**Learning:** The Move Pet desktop frontend relies heavily on icon-only buttons for UI interactions (such as close '×' icons in toasts and task management bubbles). Many of these buttons lack `aria-label` attributes, making them inaccessible to screen readers.
**Action:** Adding `aria-label="Close"` to these buttons ensures they are properly announced by screen readers without visually cluttering the UI. This aligns with accessibility best practices.
