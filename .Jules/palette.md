## 2024-05-14 - Missing ARIA labels on close buttons
**Learning:** Found a widespread pattern across toast and modal components (AchievementToast, VictoryToast, etc.) where icon-only "×" close buttons lack `aria-label` attributes, making them inaccessible to screen readers.
**Action:** When adding new toasts or modals with icon-only buttons, always ensure they include a descriptive `aria-label` (e.g., `aria-label="Close"`).
