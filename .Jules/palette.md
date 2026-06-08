## 2024-10-24 - Accessible Icon-Only Buttons in Toasts
**Learning:** The Move Pet desktop frontend relies heavily on icon-only buttons (like '×' for closing toasts and modals) which lack screen reader context, creating an accessibility issue pattern across notification components.
**Action:** Always add descriptive `aria-label` attributes to icon-only interactive components (like `aria-label="Close"`) to ensure screen reader accessibility.
