## 2024-05-15 - Missing ARIA Labels on Icon-only Buttons
**Learning:** Found multiple toast and interactive UI components in Move Pet that rely solely on `×` characters or SVG icons for button labels (e.g., `<button>×</button>`), making them inaccessible to screen readers. We need to explicitly add `aria-label` to these components to meet a11y standards.
**Action:** Always verify new UI components containing icon-only buttons include an `aria-label` attribute describing their action.
