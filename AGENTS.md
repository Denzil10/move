# AGENTS.md

## Mode

This is a PERSONAL project, despite living under `~/Projects/personal/public`.

Workflow: explore current state, implement the smallest useful improvement, verify, record lessons after failures/corrections, then keep going autonomously. Skip heavy plan-first overhead unless the work is architectural, risky, or explicitly asks for a plan.

## Product

Build and run Move Pet on autopilot: a lightweight desktop companion that motivates people to move during gaming, work, coding, and social media.

Core behavior:

- Pet appears after long inactivity and looks disturbed.
- It gets happy when the user moves, floats with them, then disappears after 3 seconds.
- Strict mode can lock keyboard/mouse until a movement target is met.
- Motion detection stays local and lightweight.
- Victory toast shows estimated calories burned.

Business behavior:

- Research, execute, review, improve continuously.
- Use free-tier tools first.
- Ask only for important business decisions.
- Optimize for shipping and profitability.

## Autopilot

Primary files:

- `docs/business-autopilot.md` - product and business spec.
- `docs/technical-research.md` - desktop, overlay, motion, strict-mode research.
- `tasks/autopilot.md` - lightweight backlog.
- `autopilot/prompts/system.md` - loop prompt.
- Agent service project: `/Users/denzil/Projects/personal/self/agent/projects/move`.
- Agent service UI/API: `http://localhost:3001`.
- `memory/ontology/graph.jsonl` - project memory graph.

Loop rules:

- Run every 5 minutes when active.
- Runner is the shared agent service, using Gemini CLI for the Move autopilot.
- Research before inventing; prefer proven open-source approaches.
- Improve product, marketing, docs, and backlog.
- Ask before pricing, public posting/launching, paid services, risky distribution choices, or new credentials.
- Do not ask for routine implementation, research, docs, or local verification.

## Autopilot Runtime

- Move autopilot runs only through the shared agent service.
- Harnesses: Gemini CLI primary, Jules as async cloud-task harness.
- Do not recreate repo-local Gemini CLI or proxy autopilot loops.

Secrets:

- Never print `.env`, global CLI settings, provider keys, tokens, or compose-rendered env output.
- Avoid `docker compose config` when compose loads real `.env`; it expands secrets.
- Use redacted diagnostics.

## Browser

For browser/account setup, use profile 1 instructions from `/Users/denzil/.agents/mcp/BROWSER_USAGE.md` when available. If missing, do not improvise sensitive account flows. Login email if needed: `denzilnel114@gmail.com`. Browser-controlled free tools are allowed for free-tier workflows.

## Engineering

- Use `uv run`, not global `python`.
- Python target is 3.14.
- Prefer `rg` for search.
- Read relevant files before changing behavior.
- Keep changes small and modular.
- Add focused tests for new logic.
- Remove dead code and stale approaches after major iterations.
- Do not add `# type: ignore` or `# ty: ignore`; fix the cause.

Checks:

- Full: `uv run ruff format`, `uv run ruff check .`, `uv run ty check`, `uv run pytest`.
- Small edits: run the smallest meaningful subset plus `ruff check` on touched files.

## Lessons

Read `tasks/lessons.md` before substantial work. Current essentials:

- Gemini CLI in service should prefer cached OAuth credentials; API key is fallback.
- Scheduler overlap while an agent lock is held should log `SKIP`, not `FAIL`.
- Docker compose config can print secrets from real `.env`.
- Docker images must exclude `.env`, `.claude/`, `local/`, and workspace state.
- This repo is PERSONAL mode despite its path.

## Git

- No remote git actions unless explicitly requested.
- Do not revert user changes.
- File deletions require explicit user request.
- Commits are optional in PERSONAL mode unless requested or preserving a stable milestone.

## Updates

Keep updates concise:

- `Done`: what changed or was verified.
- `Next`: immediate next action or blocker.
