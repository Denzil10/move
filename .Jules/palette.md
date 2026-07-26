## 2024-07-26 - Missing aria-label on Toast Close Buttons
**Learning:** React Toast components in this app frequently use an icon-only "×" button to dismiss the notification, which causes accessibility issues for screen reader users as the button lacks descriptive text.
**Action:** When adding new Toast components or similar floating UI elements with icon-only close buttons, ensure they always have an explicit `aria-label="Close"` attribute applied to the button element.
