## 2025-06-11 - Add ARIA Labels to Icon-Only Action Buttons in FloatingPet
**Learning:** React/Tauri app has multiple icon-only action buttons (Snooze, Mark as Done, Cancel, Close, etc.) throughout its floating widgets and setting screens. These lack screen-reader accessibility contexts via aria-labels.
**Action:** Always ensure any `<button>` containing only an SVG/Icon or uninformative text like '×' features an `aria-label` providing context on its interactive functionality.
