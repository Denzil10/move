## 2024-05-15 - Missing ARIA Labels on Icon-only Buttons
**Learning:** Found multiple instances of icon-only close buttons in toast components (e.g., LevelUpToast, GoalReachedToast, AchievementToast, VictoryToast) missing `aria-label` attributes. This is a common accessibility gap in React components using raw HTML buttons with simple icon characters (like `×`).
**Action:** Always verify `aria-label` is present on buttons whose children only consist of emojis, icons, or characters lacking text content recognizable by screen readers.
