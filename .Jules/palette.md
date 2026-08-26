## 2024-08-26 - Missing ARIA Labels on Toast Notifications
**Learning:** This application heavily utilizes custom toast notifications (e.g., AchievementToast, VictoryToast) which include icon-only "×" close buttons that frequently lack `aria-label` attributes.
**Action:** When adding or reviewing new toast or notification components in this application, explicitly ensure the close buttons have an `aria-label="Close"` to meet accessibility requirements.
