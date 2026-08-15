## 2024-05-24 - Missing Context on Symbol-based Icon Buttons
**Learning:** This application's UI pattern heavily relies on single-character symbols (like "×" for closing or "💬" for chat) within buttons across many toast and overlay components. These lack inherent meaning for screen readers.
**Action:** When working on or creating UI components in this application, always explicitly add descriptive `aria-label` attributes to icon-only and symbol-only buttons to ensure they are accessible.
