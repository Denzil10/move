## 2024-06-05 - Missing ARIA Labels on Icon-only Close Buttons
**Learning:** The Move Pet desktop app relies heavily on icon-only '×' buttons to dismiss various overlays (like Toasts, Journals, and Skill Trees). By default, these lack accessible names, meaning screen readers do not provide context when the button has focus.
**Action:** When implementing new toasts, overlays, or components that can be dismissed, always ensure any icon-only `<button>` has a descriptive `aria-label` (e.g., `aria-label="Close"`).
