## 2026-06-12 - Found Multiple Missing ARIA Labels on Close Buttons
**Learning:** Found several modal `close-btn` and `victory-close` components across the application that were lacking `aria-label` attributes. Without these attributes, screen readers only see the generic '×' symbol, resulting in poor accessibility and poor user experience for visually impaired users.
**Action:** Applied `aria-label="Close"` to all identifiable `close-btn` and `victory-close` buttons across all affected components to ensure keyboard accessibility and clear screen reader announcements for all dismissable modal windows.
## 2026-06-12 - Found Missing ARIA Label on Pet Chat Button
**Learning:** The `chat-btn` in `Pet.tsx` was an icon-only button (💬) lacking an `aria-label`. Screen readers would likely announce it as 'unlabelled button' or similar.
**Action:** Added `aria-label="Chat with Pet"` to the `chat-btn` in `Pet.tsx` to ensure accessibility.
