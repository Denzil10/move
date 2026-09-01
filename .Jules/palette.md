## 2024-10-27 - Icon-only buttons require ARIA labels
**Learning:** Icon-only close buttons (like × or &times;) without ARIA labels are a widespread accessibility issue across various toasts and modals, preventing screen readers from conveying the action to users.
**Action:** Implemented `aria-label="Close"` on all icon-only close buttons across the app's components to improve screen reader accessibility without affecting visual layout.
