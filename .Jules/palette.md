## 2026-06-02 - Adding ARIA labels to icon-only buttons
**Learning:** Icon-only close buttons (×) and interaction bubbles in toasts and specific UI components (like floating pet overlay) lack accessibility labels, making them invisible to screen readers.
**Action:** Applied `aria-label` attributes to all icon-only `<button>` components (like close/snooze/done) to ensure keyboard and screen-reader accessibility for interactions.
