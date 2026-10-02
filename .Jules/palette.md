## 2024-05-18 - Missing ARIA Labels on Icon-only Close Buttons
**Learning:** The application heavily utilizes icon-only buttons (like `×` or `&times;`) for dismissing modals and toasts (e.g., `FriendshipLevelUpToast`, `VictoryToast`, `GoalReachedToast`, `LevelUpToast`, `AchievementToast`, `FriendToast`, etc.). These buttons consistently lack `aria-label` attributes, making them inaccessible to screen reader users who will not understand the purpose of the button.
**Action:** Adding `aria-label="Close"` to these icon-only buttons to improve accessibility without changing the visual design or component structure.

## 2024-05-18 - Resolving ty check errors for unresolved imports
**Learning:** The Python backend uses `ty check` to analyze the code for issues. External dependencies like `xdk` and `requests_oauthlib` may throw an unresolved-import error if not whitelisted in `pyproject.toml`.
**Action:** Add these dependencies to the `allowed-unresolved-imports` list under `[tool.ty.analysis]` in `pyproject.toml` to prevent CI failures.
