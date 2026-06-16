## 2024-05-18 - Missing ARIA Labels on Icon-only Buttons
**Learning:** Found multiple instances of icon-only buttons (like × or 💬) lacking `aria-label` attributes in the React components, making them inaccessible to screen readers.
**Action:** Always add descriptive `aria-label` attributes to buttons that contain only symbols, emojis, or icons to ensure full accessibility.
