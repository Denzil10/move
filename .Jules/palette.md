## 2024-05-28 - ARIA Labels for Icon-Only Buttons
**Learning:** Found that desktop/src components frequently use icon-only close buttons (e.g. `×`) without `aria-label` or title attributes, making them inaccessible to screen readers.
**Action:** Implemented `aria-label` on `.close-btn` and task action buttons (`.bubble-btn`) across multiple components and screens to adhere to accessibility standards.
