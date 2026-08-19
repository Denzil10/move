
## 2024-08-19 - Added ARIA labels to Toast Close Buttons
**Learning:** This application heavily relies on Toast notifications across various components (Achievement, Friendship, Goals, Victory). The standard pattern for close buttons across these Toasts used the literal `×` character without any `aria-label`, creating a significant accessibility gap for screen readers attempting to dismiss these overlays.
**Action:** Always verify new Toast or overlay components for the presence of `aria-label="Close"` on their icon-only dismissal buttons. Consider establishing a unified, accessible `CloseButton` component for reuse across all Toasts to prevent this regression.
