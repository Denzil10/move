## 2026-09-26 - Accessibility of Toast Close Buttons
**Learning:** The application uses '×' characters for icon-only close buttons across various Toast components, which screen readers will not announce clearly without an ARIA label.
**Action:** Add aria-label='Close' to all icon-only toast close buttons to ensure accessibility.
