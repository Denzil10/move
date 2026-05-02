# Errors

Command failures and integration errors.

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
