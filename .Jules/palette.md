## 2024-06-09 - Added ARIA Labels to Icon-Only Close Buttons
**Learning:** The desktop frontend relies heavily on icon-only close buttons ('×') in toast notifications and modal headers, but they are lacking `aria-label` attributes, creating a significant accessibility barrier for screen readers.
**Action:** Consistently add `aria-label="Close"` to all icon-only close buttons in new and existing components to improve accessibility without changing the visual layout.
