## 2024-05-20 - Missing ARIA Labels on Icon-Only Close Buttons
**Learning:** The desktop frontend extensively relies on single-character text icons (like '×' and '&times;') for close buttons across toasts and modals. These icon-only buttons lack accessible names, making them invisible or confusing to screen reader users.
**Action:** Consistently add `aria-label="Close"` to all icon-only interactive elements, starting with toast and modal close buttons, to ensure strict accessibility compliance.
