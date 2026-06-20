## 2024-06-20 - Add ARIA Labels to Icon-Only Action Buttons

**Learning:** This app extensively relies on single-character text symbols and emojis (like `×`, `💬`, `&times;`) to represent interactive action buttons (such as close buttons) within toasts and modals. Often, these buttons completely lack `aria-label` attributes, making them inaccessible to screen readers.

**Action:** Whenever introducing or modifying components like toasts, modals, or hovering bubbles that utilize these minimalist, symbol-only action buttons, explicitly verify that a descriptive `aria-label` is included before finalizing the component changes to ensure continuous accessibility compliance.
