## 2024-05-24 - Accessibility: ARIA Labels for Icon-Only Buttons
**Learning:** React frontend components (especially toasts, overlays, modals, and bubbles) extensively rely on single-character emojis (like ×, 💬, 🔥) and inline SVGs for interactive icon-only buttons. Screen readers cannot properly announce these buttons if they lack explicit ARIA labels.
**Action:** Consistently verify and add descriptive aria-label attributes to icon-only buttons (.close-btn, etc.) while ensuring keyboard accessibility is maintained. Avoid adding generic labels to buttons that already contain meaningful text.
