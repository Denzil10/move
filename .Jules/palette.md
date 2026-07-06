## Move Pet UX Journal
## 2025-03-06 - Missing ARIA Labels on Icon-Only UI Elements
**Learning:** Found an accessibility issue pattern specific to this app's components where a significant number of interactive icon-only elements (such as `×` buttons on modals and toasts, or `💬` on the pet chat button) lacked `aria-label` attributes, rendering them invisible to screen readers.
**Action:** Always ensure any new interactive overlay, toast, or modal incorporates descriptive `aria-label` attributes on icon-only close/action buttons to preserve full screen reader accessibility.
