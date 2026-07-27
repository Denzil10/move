## 2024-05-14 - Add ARIA Labels to Toast Close Buttons
**Learning:** Found multiple toast components (Achievement, LevelUp, Victory, etc.) in the app using icon-only `<button>×</button>` elements without accessible names. This creates empty buttons for screen readers.
**Action:** Always verify that "×" icon buttons across toast and modal components have `aria-label="Close"` or similar descriptive labels.
