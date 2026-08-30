## 2025-05-18 - Missing ARIA Labels on Icon-only Close Buttons
**Learning:** Found multiple toast and modal components (FriendshipLevelUpToast, VictoryToast, GoalReachedToast, SkillTree, PetConversation, PetJournal, AchievementToast, FriendToast, Collection, LevelUpToast, QuestJournal, AppUsageReport) using icon-only buttons (like '×' or '&times;') without `aria-label="Close"`. This makes it difficult for screen readers to identify the button's purpose.
**Action:** Always add `aria-label="Close"` to icon-only close buttons.
