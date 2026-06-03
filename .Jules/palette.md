## 2024-05-18 - Added ARIA Labels to Interactive Components
**Learning:** Icon-only buttons (like the close "×" buttons in Toasts and the chat "💬" button) lacked descriptive `aria-label`s, making them inaccessible to screen readers. This pattern was present across multiple components in the app.
**Action:** Added `aria-label="Close"` to all close buttons and `aria-label="Chat with Pet"` to the chat button to ensure accessibility standards are met for interactive components.
