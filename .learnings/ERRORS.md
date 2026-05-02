# Errors

Command failures and integration errors.

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
