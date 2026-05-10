# Errors

Command failures and integration errors.

---

## [ERR-20260508-001] browser-use-cli

**Logged**: 2026-05-08T12:14:11+05:30
**Priority**: high
**Status**: fixed
**Area**: tooling

### Summary
`browser-use doctor` crashed on Homebrew Python 3.14 before diagnostics could run.

### Error
```text
RuntimeError: There is no current event loop in thread 'MainThread'.
```

### Context
- Command: `browser-use doctor`
- Package: `browser-use==0.12.6`
- Cause: synchronous CLI code called `asyncio.get_event_loop()` when Python 3.14 had no default loop in the main thread.

### Suggested Fix
Use a CLI helper that catches `RuntimeError`, creates a new event loop with `asyncio.new_event_loop()`, sets it with `asyncio.set_event_loop()`, and then runs the coroutine.

### Metadata
- Reproducible: yes
- Related Files: `/opt/homebrew/lib/python3.14/site-packages/browser_use/skill_cli/main.py`

---

## [ERR-20260502-006] docker_autopilot_build

**Logged**: 2026-05-02T23:20:00+05:30
**Priority**: medium
**Status**: fixed
**Area**: infra

### Summary
Docker autopilot build failed because `uv sync` ran before package metadata files were copied.

### Error
```text
OSError: Readme file does not exist: README.md
```

### Context
- Command/operation attempted: `docker compose -f docker-compose.autopilot.yml build autopilot`
- The Dockerfile copied only `pyproject.toml` and `uv.lock` before `uv sync`.
- Hatchling validates `readme = "README.md"` during editable package build.

### Suggested Fix
Copy the project context before `uv sync`, relying on `.dockerignore` to keep secrets and local state out of the image.

### Metadata
- Reproducible: yes
- Related Files: Dockerfile.autopilot, .dockerignore

---

## [ERR-20260502-005] autopilot_loop_smoke

**Logged**: 2026-05-02T21:05:00+05:30
**Priority**: medium
**Status**: fixed
**Area**: infra

### Summary
The autopilot loop assumed JSON responses, but the local proxy can return SSE-style text for successful message calls.

### Error
```text
ERROR: Expecting value: line 1 column 1 (char 0)
```

### Context
- Command/operation attempted: `python scripts/autopilot_loop.py --once`
- The proxy returned HTTP 200, but the client tried `response.json()` unconditionally.
- Fixed by parsing both Anthropic JSON content blocks and SSE `text_delta` events.

### Suggested Fix
Keep response parser coverage for JSON, SSE, and empty-body success responses.

### Metadata
- Reproducible: yes
- Related Files: scripts/autopilot_loop.py, tests/test_autopilot_loop.py

---

## [ERR-20260502-004] docker_compose_config

**Logged**: 2026-05-02T21:01:18+05:30
**Priority**: high
**Status**: pending
**Area**: config

### Summary
`docker compose config` expands env files and can print secret values.

### Error
```text
Compose config rendered environment variables from the local env file, including provider credentials. Values are redacted from this log entry.
```

### Context
- Command/operation attempted: validate `docker-compose.autopilot.yml`
- Environment details: project uses ignored `.env` for provider credentials
- Avoid repeating compose config output when `env_file` points at secret-bearing files.

### Suggested Fix
Use syntax-only review, redacted env files, or a temporary example env file for compose validation.

### Metadata
- Reproducible: yes
- Related Files: docker-compose.autopilot.yml

---

## [ERR-20260502-002] zsh-status-variable

**Logged**: 2026-05-02T20:00:00+05:30
**Priority**: low
**Status**: resolved
**Area**: tooling

### Summary
Using `status` as a shell variable fails in zsh because it is read-only.

### Error
```text
zsh: read-only variable: status
```

### Context
- Attempted a shell probe loop for NVIDIA model streaming support.
- Renamed the variable to `probe_status`.

### Suggested Fix
Avoid zsh reserved/read-only names such as `status` for local script variables.

### Metadata
- Reproducible: yes

---

## [ERR-20260502-003] nvidia-nim-streaming

**Logged**: 2026-05-02T20:05:00+05:30
**Priority**: high
**Status**: resolved
**Area**: backend

### Summary
NVIDIA NIM free endpoints accepted top model requests but upstream streaming produced no usable content chunks in live tests.

### Error
```text
message_start emitted by proxy; no content_block_delta before timeout
```

### Context
- Tested GLM-5.1, DeepSeek V4, Qwen3.5, MiniMax M2.7, and Kimi K2 variants.
- Direct non-streaming completions worked for some models.
- Added `NVIDIA_NIM_FORCE_NON_STREAMING` to synthesize Claude-compatible SSE from non-streaming completions.

### Suggested Fix
Use `NVIDIA_NIM_FORCE_NON_STREAMING=true` for this free NVIDIA setup and verify models with live probes before making them defaults.

### Metadata
- Reproducible: yes

---

## [ERR-20260502-001] free-claude-code-runtime

**Logged**: 2026-05-02T19:45:00+05:30
**Priority**: medium
**Status**: pending
**Area**: config

### Summary
The proxy will not start with an NVIDIA NIM model configured unless `NVIDIA_NIM_API_KEY` is set.

### Error
```text
Configured model validation failed:
- sources=MODEL provider=nvidia_nim model=z-ai/glm-5.1 problem=query failure: NVIDIA_NIM_API_KEY is not set.
```

### Context
- Attempted to run `uv run uvicorn server:app --host 127.0.0.1 --port 8082`.
- Local `.env` points `MODEL` at `nvidia_nim/z-ai/glm-5.1`.
- The upstream app validates configured provider credentials during startup.

### Suggested Fix
Add a valid `nvapi-...` key to `NVIDIA_NIM_API_KEY` in `.env`, then rerun the proxy.

### Metadata
- Reproducible: yes
- Related Files: .env.example

---
## [ERR-20260503-001] shell-find-shadowing

**Logged**: 2026-05-03T12:12:16+05:30
**Priority**: low
**Status**: resolved
**Area**: tooling

### Summary
`find` resolved to the agent-service custom command instead of system `find`.

### Error
```text
Usage: find [-d depth] [-r root] [--dir] [query]
```

### Context
- Attempted file discovery in `/Users/denzil/Projects/personal/self/agent`.
- Switched to `/usr/bin/find` for deterministic shell discovery.

### Suggested Fix
Use `/usr/bin/find` in repos that may shadow POSIX `find`.

### Metadata
- Reproducible: yes
- Related Files: /Users/denzil/Projects/personal/self/agent

---

## [ERR-20260503-002] gemini-cli-trusted-folder

**Logged**: 2026-05-03T12:24:00+05:30
**Priority**: medium
**Status**: resolved
**Area**: tooling

### Summary
Headless Gemini CLI refused to run the mounted Move workspace until explicitly trusted.

### Error
```text
Gemini CLI is not running in a trusted directory.
```

### Context
- Triggered `move/autopilot` through the shared agent service.
- Runner cwd was `/repos/move`; Gemini exited with code 55.
- Fixed the runner by setting `GEMINI_CLI_TRUST_WORKSPACE=true` for the Gemini harness.

### Suggested Fix
Always set `GEMINI_CLI_TRUST_WORKSPACE=true` for non-interactive Gemini CLI runs in trusted automation containers.

### Metadata
- Reproducible: yes
- Related Files: /Users/denzil/Projects/personal/self/agent/scheduler/runner.py

---
