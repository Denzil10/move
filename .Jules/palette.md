## 2024-07-04 - Accessible Close Buttons
**Learning:** The React frontend heavily relies on icon-only buttons for UI interactions (such as close '×' or '&times;' icons in toasts, modals, and task management bubbles). These lacked `aria-label`s, breaking screen reader accessibility.
**Action:** Added `aria-label="Close"` to generic close buttons and descriptive `aria-label`s to other icon-only interactive buttons (like snooze and checkmark done icons) to ensure comprehensive accessibility across components.
