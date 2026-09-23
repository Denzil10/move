## 2024-05-18 - Add ARIA Labels to Icon-Only Close Buttons
**Learning:** Found an accessibility issue pattern across the app where icon-only close buttons (like × and &times;) are missing descriptive `aria-label`s, preventing screen readers from understanding their purpose.
**Action:** Adding `aria-label="Close"` to these specific buttons across components.
