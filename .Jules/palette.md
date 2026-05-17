## 2024-05-17 - Added ARIA labels to icon-only buttons
**Learning:** The Move Pet desktop frontend relies heavily on icon-only buttons for UI interactions (such as close '×' icons in toasts and task management bubbles). These lacked descriptive `aria-label` attributes.
**Action:** Ensure all such interactive components include descriptive `aria-label` attributes for screen reader accessibility. Added `aria-label="Close"` to close buttons and improved the task removal button label.
