## 2024-05-18 - Missing aria-labels on icon-only buttons
**Learning:** Found multiple icon-only buttons across toasts and popups in the UI that lack descriptive `aria-label` attributes. This causes a major accessibility regression for screen readers which won't know the function of buttons like close '×'.
**Action:** Adding `aria-label` properties (e.g. `aria-label="Close"`) strictly to icon-only interactive elements in components such as AchievementToast, GoalReachedToast, LevelUpToast, PetConversation, and VictoryToast.
