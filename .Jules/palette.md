## 2026-08-02 - Missing ARIA Labels on Close Buttons
**Learning:** The desktop React app extensively uses icon-only close buttons (e.g., '×' and '&times;') in toast notifications and overlays without aria-labels, making them inaccessible to screen readers.
**Action:** Add `aria-label="Close"` to icon-only close buttons across toasts and modals.
