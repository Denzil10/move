## 2023-10-27 - [Add ARIA Labels to Icon-Only Buttons]
**Learning:** React components extensively use icon-only buttons (like `×` for close buttons, `💬` for chat, `&times;` etc.). While functional, they lack `aria-label`s which causes a widespread accessibility issue for screen readers.
**Action:** Applied `aria-label="Close"` or `aria-label="Chat with Pet"` or `aria-label="Delete entry"` to all such icon-only buttons across multiple components to ensure screen reader accessibility.
