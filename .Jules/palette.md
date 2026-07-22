## 2023-10-27 - Icon-Only Button Accessibility Pattern
**Learning:** Found multiple instances (PetJournal, AchievementToast, Collection) of close buttons utilizing single-character text (e.g., '×' or '&times;') for visually representing "close" actions, which lack context for screen readers.
**Action:** Always verify that all icon-only or single-character visual buttons have descriptive `aria-label` attributes to ensure they are fully accessible to screen reader users.
