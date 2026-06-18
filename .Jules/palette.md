## 2026-06-18 - Missing Aria Labels on Close Buttons
**Learning:** The application heavily uses interactive close buttons represented by a simple multiplication sign (×) or other single-character emojis without `aria-label`s. This makes them inaccessible to screen reader users who rely on non-visual context.
**Action:** Iterate through the `apps/desktop/src/components` directory and add `aria-label="Close"` to all icon-only close buttons (like ×) to ensure they are accessible. Avoid adding these labels to buttons with dynamic or visible text content as per user request.
