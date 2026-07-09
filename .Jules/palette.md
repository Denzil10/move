## 2024-07-09 - Accessible Icon-Only Buttons
**Learning:** The desktop app extensively uses single-character emojis (×) and HTML entities (&times;) for close buttons and other actions. These lack accessible names, meaning screen readers only announce 'button' or 'times'.
**Action:** Always include an explicit `aria-label` (e.g., `aria-label="Close"`) for any button that contains only an icon or emoji, to ensure full keyboard and screen reader accessibility.
