## 2026-08-04 - Toast Close Buttons Accessibility
**Learning:** Icon-only close buttons in Toast components lacked ARIA labels, making them inaccessible to screen readers.
**Action:** Added aria-label="Close" to icon-only buttons in Toasts. Will ensure future icon-only buttons always include descriptive ARIA labels.
