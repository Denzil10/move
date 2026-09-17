## 2024-05-25 - Standardize ARIA Labels on Close Buttons
**Learning:** Found a widespread pattern where modal and toast close buttons only used un-labeled "×" or "&times;" text characters, making them inaccessible to screen readers.
**Action:** Always verify that simple text icons have an explicit `aria-label` attribute describing their function (e.g. `aria-label="Close"`) when building or modifying interactive overlay components.
