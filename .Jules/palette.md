## 2026-08-16 - Add aria-label to icon-only buttons
**Learning:** This application heavily relies on toast notifications and modals with close ('×') buttons that lack accessible names. Adding `aria-label` to these buttons is necessary for screen reader accessibility, as '×' isn't descriptive.
**Action:** Adding `aria-label="Close"` to all close buttons across the app's components.
