## 2024-05-25 - Icon-only buttons lacking ARIA labels
**Learning:** The Move Pet desktop frontend relies heavily on icon-only buttons for UI interactions (such as close '×' icons in toasts and task management bubbles) which currently lack accessibility descriptions.
**Action:** Ensure all such interactive components include descriptive `aria-label` attributes for screen reader accessibility.
