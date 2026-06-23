
## 2026-06-23 - App-Specific Icon-Only Button Accessibility
**Learning:** In the Move Pet desktop frontend, there is an established UI convention that heavily relies on single-character emojis (like ×, 💬, 🔥) and inline SVGs to act as interactive icon-only buttons in various components such as toasts, modals, and overlays. Often, these lack `aria-label`s causing accessibility gaps.
**Action:** When adding or updating components with icon-only interactive elements (like close buttons or action triggers), ensure they include explicit `aria-label` attributes to ensure screen reader support, adhering strictly to the UX standards.
