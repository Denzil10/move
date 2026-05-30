## Move Pet UX Guidelines\n\n
## 2024-05-30 - Missing ARIA Labels on Icon Buttons
**Learning:** The Move Pet app utilizes many icon-only close buttons (`×`) across multiple components (toasts, modals, setup screens). Currently, many of these elements lack descriptive `aria-label`s, which degrades the experience for screen reader users by rendering these interactive elements inaccessible.
**Action:** Add `aria-label="Close"` to all icon-only close buttons (`<button>×</button>`).
