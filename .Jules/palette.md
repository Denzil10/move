
## 2025-02-17 - Missing ARIA Labels on Icon-Only Close Buttons
**Learning:** Across various Toast notification components in this app (e.g., AchievementToast, VictoryToast, GoalReachedToast), there is a recurring pattern of using the '×' emoji inside `<button>` elements for closing the toast without any text or `aria-label`. This makes these buttons completely unannounced or poorly announced to screen reader users, breaking accessibility.
**Action:** Always add `aria-label="Close"` to any icon-only close button (especially those using the '×' or '&times;' characters) when creating or updating UI components, particularly modals, toasts, and overlays.
