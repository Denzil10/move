## 2024-05-18 - Missing ARIA Labels on Icon-only Buttons
**Learning:** Found multiple toast and dialog components using '×' or '&times;' for close buttons without any accessible `aria-label`. This makes it difficult for screen readers to interpret the button's purpose.
**Action:** Always verify that all icon-only buttons (like close buttons) have a descriptive `aria-label` (e.g., `aria-label="Close"`).
