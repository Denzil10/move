## 2024-08-01 - Add ARIA Labels to Toast Close Buttons
**Learning:** The Move Pet application extensively uses single-character emoji or symbol icon-only buttons (like "×") for closing toast notifications without providing screen-reader friendly `aria-label`s, breaking accessibility for non-visual users.
**Action:** Always verify that interactive components with icon-only buttons have descriptive `aria-label` attributes (e.g., `aria-label="Close"`) prior to creating components.
