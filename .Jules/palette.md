## 2024-05-20 - Missing ARIA Labels on Close Buttons
**Learning:** Found a widespread pattern in the desktop app's toast and modal components where icon-only close buttons (using "×" or "&times;") lacked `aria-label` attributes, making them inaccessible to screen readers.
**Action:** Always ensure any icon-only interactive elements, especially close buttons in overlays and notifications, have descriptive `aria-label="Close"` attributes.
