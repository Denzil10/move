## 2024-05-24 - Accessibility on Icon-only Buttons
**Learning:** Found multiple instances of close buttons (×) without aria-labels in the toast and UI components. In an app heavily relying on small notification bubbles and overlays, screen readers will read "times" or nothing, making it difficult for visually impaired users to dismiss them.
**Action:** Always add `aria-label="Close"` to any button that uses an icon or symbol instead of text.
