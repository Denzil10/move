## 2024-05-30 - Added ARIA labels to icon-only buttons
**Learning:** React frontend heavily relies on single-character emojis and inline SVGs for interactive icon-only buttons. Many action buttons (e.g. toasts, task bubbles) lacked proper accessibility labels.
**Action:** Always ensure strict accessibility for all such interactive components by adding descriptive `aria-label` attributes.
