## 2024-05-24 - Add ARIA Labels to Icon-Only Buttons
**Learning:** Found multiple close buttons across toasts and modals missing aria-labels. Screen readers would just read 'times' or 'multiply' which is confusing.
**Action:** Always include aria-label='Close' on buttons that only contain an '×' character.
