## 2024-05-31 - Initial Setup
**Learning:** Initial Palette journal creation
**Action:** Ready to record critical UX/accessibility learnings.

## 2024-05-31 - Global Missing ARIA Labels on Icon-Only Buttons
**Learning:** Found a widespread app-specific pattern where modal/toast close buttons (`×` or `&times;`) across numerous components (`VictoryToast`, `QuestJournal`, `Collection`, etc.) lacked `aria-label` attributes, rendering them inaccessible to screen readers.
**Action:** Applied a global fix to add `aria-label="Close"` to all standard close buttons and `aria-label="Cancel"` to setup setup screens. In future enhancements, verify that any new icon-only interactive element includes descriptive ARIA labels by default.
