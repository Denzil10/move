## 2026-08-13 - Add ARIA labels to icon-only close buttons
**Learning:** Multiple interactive toast notifications and overlays in the app use `×` and `&times;` for close buttons without `aria-label`s. This breaks accessibility for screen reader users by removing meaningful context from the button action.
**Action:** Always verify and manually add `aria-label="Close"` to any new interactive `×` or `&times;` icon-only buttons introduced in the app.
