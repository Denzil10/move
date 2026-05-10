# Lessons

- The configured browser instruction file `/Users/denzil/.agents/mcp/BROWSER_USAGE.md` is missing in this environment, so browser-account flows should not be improvised.
- Treat this repo as PERSONAL mode despite its path under `~/Projects/personal/public`; the user explicitly corrected the default WORK-mode assumption.
- Avoid `docker compose config` against compose files that load the real `.env`; it expands and prints secret-bearing environment values.
- Docker images for this repo must exclude `.env`, `.claude/`, `local/`, and workspace state via `.dockerignore`; runtime secrets belong in compose `env_file`, not baked into the image.
- Move Pet autopilot now runs from the shared agent service with Gemini CLI; do not recreate the old repo-local Claude/proxy loop.
- Gemini CLI in the service should prefer cached OAuth credentials; API key auth is fallback when OAuth creds are unavailable.
- Scheduler overlap when an agent lock is already held is expected; log that as `SKIP` instead of `FAIL`.
- When pushing to a personal repo with multiple GitHub accounts, `gh auth switch` is not enough if the remote uses SSH; set the repo remote to HTTPS with `gh auth setup-git`, and ensure the active account token has `workflow` scope before pushing `.github/workflows/*`.
- When using multiple `replace` calls on the same file in one turn, or complex insertions, verify the final file content for syntax errors like duplicate default exports or missing imports. Prefer `write_file` for a single clean update if many changes are needed or if previous `replace` calls might have corrupted the file.
- When implementing timed achievements (like 'Deep Sleep'), ensure the tracking state (e.g. `restStartTime`) is correctly reset when the condition is no longer met to prevent accidental unlocking.
- Tauri backend sound playback (Rodio) is superior to frontend for reliability, but frontend is still useful for immediate interactive feedback (chirps/grumbles).
- When implementing complex daily reset logic, consolidate all reset-dependent state updates (movements, calories, quests) into a single `useEffect` triggered by date changes to ensure atomicity and prevent partial resets.
- Quest reroll mechanics should include a currency check and ensure the new quest is different from existing ones by passing current template IDs to the generator.
- When implementing random reward mechanics (like Mystery Boxes), ensure the UI provides clear feedback for both successful rolls and "unlucky" results to maintain user engagement.
- Pet personalities can add significant depth by combining unique thought pools with gameplay modifiers (XP, coins, energy); ensuring these are accessible in the UI through level-based unlocking creates a clear progression path for the user.
- When adding new quest target types (e.g., 'shopping', 'sleep'), ensure the tracking logic is implemented in `App.tsx` (via handlers or `useEffect`) to actually increment progress, as templates in `quests.ts` alone are just data.
- Multiple `replace` calls or complex insertions on a single file in one turn can lead to syntax corruption (duplicated blocks, missing braces) if the targeting isn't perfectly surgical. Always verify the file's end state and use `write_file` or a clean rewrite of the affected section if corruption occurs.
- When refactoring large components (like `App.tsx`), extracting logic into smaller, dedicated components (like `PetShop.tsx`) significantly improves maintainability and reduces the risk of future syntax errors in the main file.
- Implementing random events can be efficiently handled by extending the existing Buff system. For example, the 'Treasure Hunt' event increases gift discovery chance by checking for the buff in the movement handler, and is triggered by a small random roll during movement.
- In resource-constrained environments, `vitest` may encounter OOM errors. Using `--poolOptions.forks.singleFork=true` or limiting parallel execution can help, but for routine autopilot cycles, partial verification through build checks and surgical code review is often more practical.

- Implementing a Friendship System adds emotional depth and encourages positive interactions. By linking friendship levels to reward multipliers (XP/Coins), users are incentivized to maintain a good relationship with their pet through petting, feeding, and consistent movement.
- Friendship decay due to neglected needs (hunger, hydration, energy at 0) creates a "consequence" for inactivity, reinforcing the app's goal of regular engagement.
- Visual feedback for friendship (like the heart badge and aura) provides immediate gratification for the user's efforts in building a bond.
- Multiple `replace` calls or complex insertions on a single file in one turn can lead to syntax corruption (duplicated blocks, missing braces) if the targeting isn't perfectly surgical. Always verify the file's end state and use `write_file` or a clean rewrite of the affected section if corruption occurs.

- Connecting existing features to create cohesive user loops (e.g., adding a "Share" button to the "Daily Recap" modal) provides significant UX value with minimal implementation effort compared to building new isolated features.
- Implementing cross-system emotional hooks (e.g., recording Friendship or Care Streak milestones in a central "Memories" gallery) reinforces the value of different gameplay systems and provides long-term emotional rewards for consistent engagement.
- When refactoring components (like extracting `PetNeedsDashboard`), ensure all required props (like `happiness`) are correctly passed from the parent component (`StatsSummary`) to avoid TypeScript build errors.
- Proactive movement reminders can be integrated into the existing pet thought system by adding personality-specific "stretch" prompts. This reinforces the app's core mission with minimal UI clutter and adds more depth to pet personalities.
- When updating data-heavy files with repetitive structures (like `personalities.ts`), using `write_file` for a clean rewrite is safer than multiple `replace` calls, as it avoids cumulative syntax errors and ensures consistent formatting.

- Consolidated wellness reporting (Pet Wellness Report) provides much higher user value than isolated stats by connecting multiple systems (needs, mood, activity) into a cohesive health narrative.
- Connecting wellness metrics (Care Score, Happiness) to the achievement system creates a "virtuous cycle" of engagement, rewarding users for the holistic health of their pet.
- Using visual indicators like sparklines and care score circles in the Journal creates a "data-driven" emotional hook that reinforces consistent pet care.
- Passing complex sampled data (like daily averages) from App.tsx to dedicated journal components allows for rich historical analysis without overcomplicating the individual component's state management.

- Transforming ephemeral features (like 'Pet Dreams') into persistent collections (like a 'Dream Journal') adds significant long-term value and provides a sense of discovery and progression for the user.
- Emitting specific events from child components (like `onDreamRecorded` from `Pet.tsx`) is a clean way to delegate persistence and state management to the parent (`App.tsx`) while keeping the child focused on visuals and logic.
- Adding achievements and milestones specifically for new secondary systems (like dreams) ensures that users feel rewarded for exploring all aspects of the application's gameplay.

- When preparing launch assets for multiple platforms simultaneously (like Product Hunt and itch.io), tailor the visual and textual assets to each specific audience (Productivity/Tech vs Gamers/Indie) while keeping the core privacy and health-tracking messaging consistent.
- For cross-device data sync, a manual JSON export/import of localStorage is a reliable MVP that avoids the complexity and cost of a backend infrastructure.

- When adding text content to JSX, ensure special characters like `>` are correctly escaped as `&gt;` to avoid build errors.
- Always perform a final build check or test run after a major refactor or `write_file` call to catch syntax regressions early.
- `browser-use==0.12.6` on Homebrew Python 3.14 can crash in CLI commands that call `asyncio.get_event_loop()` before a loop exists; patch the synchronous CLI entrypoint to create/set a new event loop, then verify with `browser-use doctor`.
- For local HTML browser-use checks, serve the directory on `127.0.0.1` and open the HTTP URL; direct `file://` can show an empty DOM/blank screenshot in this environment.
- The bundled in-app Browser Use skill may reference a Node REPL `js` tool that is not exposed in Codex; when `mcp__browser_use__.*` tools are available, use them directly instead of declaring Browser unavailable.

- Using the pet's speech bubble as an actionable UI hook (via `onThoughtClick` and a pulse-animated CSS class) provides a seamless way to transition from a suggestion to a specific app feature, like a breathing exercise, without adding more buttons to the main overlay.
- Contextual suggestions in Smart Focus (e.g., suggesting breathing when focus duration is high) feel more like "pet personality" than a system notification, improving user engagement with productivity health features.
- When implementing actionable speech bubbles, adding a visual indicator like a subtle border pulse and a scale effect on hover helps users discover that they can interact with the thought.

- When implementing automation features like "Quiet Hours" or "Productivity Mode" that span multiple components, ensure that all necessary state, props, and interface definitions are updated synchronously to avoid TypeScript build errors (e.g., missing properties in `SettingsProps`).
- React `useEffect` hooks for inactivity detection should include all relevant automation state (like `quietHoursEnabled`, `productivityModeEnabled`, `focusedApp`) in their dependency arrays to ensure the timer correctly pauses and resumes as settings change.
- Providing visual feedback for automated states (like the "Quiet Hours Active" banner in `StatsSummary`) significantly improves user trust and clarity regarding the application's behavior.
- When prototyping features that require OS-level integration (like focused window detection in Tauri), starting with frontend state scaffolding and placeholder logic allows for UI/UX validation before committing to complex backend development.
- Refined "Quiet Hours" to support separate weekend schedules by adding `quietHoursWeekendStart/End` states and updating the inactivity check logic to choose the correct window based on the current day.
- Enhanced "Pet Birthday" (adoption anniversary) by adding a visual "Party Hat" accessory in `Pet.tsx` that only appears on the anniversary, providing immediate visual feedback for the special occasion.
- Always check for existing build errors (`npm run build`) before starting a new feature. Previous iterations might have left the codebase in a broken state (e.g., botched JSX replacements or missing prop definitions), which can obscure errors introduced by your own changes. Fixing these first ensures a clean baseline.
- Gemini CLI is a harness, not a provider. Configure Move autopilot through `provider: ai-service` and an auto model such as `auto-smart`; do not set `provider: gemini-cli`.
- Agent-service validation must reject harness names in `provider`; do not silently map or support harness-as-provider configs.
- Claude Code through the current ai-service Anthropic compatibility endpoint can print literal `<tool_call>` text without executing tools. Treat this as failure; use a harness with verified tool execution such as Hermes for ai-service autopilot runs.
- Implementing a "Mini Mode" or "Focus UI" toggle at the top level of `App.tsx` allows the user to hide bulky UI components easily without needing to pass down complex visibility props, making it highly effective for a desktop companion app.
- CodexPets gallery blocks vanilla Python `urllib` fetches with 403; use browser-like headers or curl for page/download requests, and put explicit transfer timeouts on large gallery assets so a stalled pet download does not block the workflow.
