## 2024-09-16 - Toast Notifications Accessibility
**Learning:** Found multiple toast components (FriendshipLevelUpToast, VictoryToast, GoalReachedToast, LevelUpToast) using icon-only close buttons ('×') without `aria-label` attributes, causing screen readers to misinterpret or ignore the dismiss action.
**Action:** Applied `aria-label="Close"` to icon-only buttons across all toast notification components to ensure accessibility.
