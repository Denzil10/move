## 2024-05-18 - Icon-Only Button Accessibility
**Learning:** React frontend components (especially toasts/modals/widgets) frequently use single character emojis or text characters like '×' for interactive buttons without explicitly defined accessible names.
**Action:** Systematically add `aria-label` attributes to icon-only close buttons across toast and modal components to improve screen reader accessibility.
