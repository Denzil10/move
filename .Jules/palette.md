## 2024-10-03 - Icon-Only Button Accessibility
**Learning:** The frontend extensively uses icon-only buttons (like close '×' icons in modals/toasts and SVG icons in floating bubbles) without aria-labels, which is bad for screen reader accessibility.
**Action:** Adding `aria-label` to these icon-only buttons ensures screen readers announce their purpose.
