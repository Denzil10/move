## 2024-05-24 - Accessibility for Icon-only Toast Buttons
**Learning:** The Move Pet desktop app relies extensively on single-character emojis/icons (like '×') for interactive buttons inside components like Toasts, Modal Windows, and Task management bubbles. These often lack proper `aria-label` attributes.
**Action:** When adding new components such as toasts, modals, or floating bubbles, explicitly verify that all such icon-only action buttons have an `aria-label` attribute (e.g. `aria-label="Close"`) prior to creating a PR to prevent widespread accessibility gaps.
