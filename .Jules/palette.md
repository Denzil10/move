## 2025-01-28 - Missing ARIA Labels on Icon-Only Close Buttons
**Learning:** The Move Pet desktop frontend relies heavily on icon-only buttons for UI interactions (such as close '×' or '&times;' icons in toasts, overlays, and task management bubbles) which lack proper accessibility labels by default.
**Action:** Consistently added `aria-label="Close"` to all interactive components using icon-only buttons to ensure proper screen reader accessibility without modifying the visual styling.
