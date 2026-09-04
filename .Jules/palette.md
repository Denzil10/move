## 2024-09-04 - Adding ARIA labels to Icon-only Close Buttons
**Learning:** The React desktop application makes extensive use of single-character text icons (e.g., `×`, `&times;`) for modal and toast close buttons. These lack `aria-label`s, which creates a significant accessibility issue for screen readers as they will just read "times" or "multiplication X".
**Action:** Always add `aria-label="Close"` to these icon-only close buttons when encountering them in new or existing components to ensure WCAG compliance.
