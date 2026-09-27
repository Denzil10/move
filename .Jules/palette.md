## 2025-02-24 - Accessibility for Icon-only Toast Buttons
**Learning:** The Move Pet desktop app uses many toast notifications and overlays (e.g., FriendshipLevelUpToast, VictoryToast, GoalReachedToast) with icon-only close buttons (× or &times;) lacking descriptive labels, which impairs screen reader accessibility for interactive UI elements.
**Action:** Always add explicit `aria-label` attributes to icon-only buttons across React components to ensure WCAG compliance and improve accessibility without altering visual design.
