## 2024-05-24 - Inline SVG/Emoji Button Accessibility
**Learning:** Move Pet UI extensively uses inline SVGs and single emojis (like '×') as primary action buttons (Done, Snooze, Cancel). These lack inherent semantic meaning for screen readers.
**Action:** Explicitly audit all new interactive components (toasts, floating bubbles) to ensure `aria-label` attributes are applied to icon-only interactive elements.
