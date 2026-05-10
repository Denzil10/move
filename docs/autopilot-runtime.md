# Move Pet Autopilot Runtime

This document records the shared infrastructure and constraints for the Move Pet autopilot.

## Shared Infrastructure

- **Agent Service Path:** `/Users/denzil/Projects/personal/self/agent/projects/move`
- **Harness:** `hermes`
- **Harness (Async Cloud):** `Jules` (for heavy cloud tasks)
- **AI Service Provider:** `ai-service` (`auto-smart`)
- **Schedule:** `*/5 * * * *` (Runs every 5 minutes when active)

## Constraints & Boundaries

- **No-Cloud/No-Paid:** Do not introduce paid SaaS dependencies or cloud costs without explicit user approval.
- **Privacy:** Motion detection remains local. No webcam frames leave the device.
- **Personal Mode:** The repository operates in Personal mode. No remote git actions, no reverts of user changes, and no file deletions without explicit request.

## Verification

- Routine implementation, research, documentation, and local verification do not require user intervention.
- Use `uv run` for all Python tasks.
- Verify changes using:
    - `uv run ruff check .`
    - `uv run pytest`
    - Manual UI verification for frontend changes.

## Shared Agent Service Integration

The Move autopilot loop is managed by the shared agent service. It routes tasks through the `hermes` harness to `ai-service`. Verification is expected to be performed autonomously by the agent within the loop.
