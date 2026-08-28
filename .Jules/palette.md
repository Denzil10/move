## 2026-08-28 - Toast Notification Accessibility
**Learning:** The Move Pet frontend relies heavily on icon-only close buttons ('×') in Toast notifications, which were missing descriptive text for screen readers.
**Action:** Applied `aria-label="Close notification"` to these close buttons across all Toast components (Achievement, FriendshipLevelUp, GoalReached, Victory) to ensure proper accessibility.
