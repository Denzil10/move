## 2024-05-18 - Missing ARIA Labels on Icon-Only Buttons
**Learning:** The application heavily relies on "×" and "&times;" characters for close buttons across many components (toasts, modals, reports) without providing `aria-label`s, creating an accessibility barrier for screen readers.
**Action:** Adding `aria-label="Close"` to all such icon-only buttons to ensure they are properly announced by assistive technologies.
