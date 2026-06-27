## 2024-06-27 - App-Wide Missing ARIA Labels on Icon-Only Buttons
**Learning:** This app extensively relies on single-character emojis (like ×, 💬) for interactive icon-only buttons across toasts, modals, and bubbles without descriptive ARIA labels, creating a recurring accessibility barrier for screen readers.
**Action:** When adding new UI elements (like toasts or floating windows), always explicitly ensure icon-only buttons include descriptive `aria-label` attributes to prevent this accessibility gap from spreading.
