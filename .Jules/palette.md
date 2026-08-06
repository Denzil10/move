
## 2026-08-06 - Add ARIA Labels to Toast Close Buttons
**Learning:** The application uses several variations of a Toast component (e.g. AchievementToast, VictoryToast) which all contain icon-only '×' close buttons. These were lacking `aria-label` attributes, making them inaccessible to screen readers.
**Action:** Adding `aria-label="Close"` to these specific icon-only buttons improves accessibility without altering the visible UI.
