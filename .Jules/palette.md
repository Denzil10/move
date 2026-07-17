## 2024-07-17 - Missing ARIA Labels on Icon-only Buttons
**Learning:** Found multiple instances where icon-only buttons (like `×` for close) lack `aria-label` attributes. This is an accessibility violation (WCAG 2.5.3) as screen readers will simply read "times" or nothing at all, instead of "Close".
**Action:** Will update all occurrences of icon-only `×` buttons to include `aria-label="Close"`. Will also check for any other icon-only buttons (like 💬 or emoji buttons) and ensure they have descriptive `aria-label`s. Ensure not to apply aria-labels to buttons with visible meaningful text.
