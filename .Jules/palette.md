## 2024-03-08 - Icon-Only Button Accessibility
**Learning:** Found widespread accessibility issue across multiple toast/modal components in the Move Pet app where "×" close buttons and emoji-based chat buttons lacked `aria-label` attributes.
**Action:** Implemented `aria-label="Close"` and `aria-label="Chat with Pet"` on all such buttons to ensure screen reader accessibility for interactive elements.
