# Learnings

Corrections, insights, and knowledge gaps captured during development.

**Categories**: correction | insight | knowledge_gap | best_practice

---

## [LRN-20260509-002] correction

**Logged**: 2026-05-09T01:16:31+05:30
**Priority**: high
**Status**: applied
**Area**: config

### Summary
The agent service must not support harness names as provider values.

### Details
The user clarified that fixing Move's config was not enough. The shared agent service itself should reject configs such as `provider: gemini-cli`, `provider: claudep`, `provider: codex`, or `provider: jules` instead of treating harness names as providers.

### Suggested Action
Validate subagent YAML at load, write, and dispatch boundaries. Keep harness and provider namespaces explicit and separate.

### Metadata
- Source: user_feedback
- Related Files: `/Users/denzil/Projects/personal/self/agent/scheduler/config_validation.py`
- Tags: autopilot, config-validation, harness, provider

---

## [LRN-20260509-001] correction

**Logged**: 2026-05-09T01:03:16+05:30
**Priority**: high
**Status**: applied
**Area**: config

### Summary
Gemini CLI is a harness, not a provider, and Move autopilot should run through ai-service.

### Details
The user corrected the Move autopilot runtime model: `gemini-cli` must not be configured in the provider field. The shared agent config now uses `provider: ai-service` with `model: auto-smart`; harness remains the CLI execution layer.

### Suggested Action
When checking or editing shared-agent configs, keep `harness` and `provider` separate. Use `provider: ai-service` for Move autopilot auto-model routing.

### Metadata
- Source: user_feedback
- Related Files: `/Users/denzil/Projects/personal/self/agent/projects/move/agents/autopilot/subagent.yaml`, `docs/autopilot-runtime.md`
- Tags: autopilot, ai-service, harness, provider

---

## [LRN-20260508-001] best_practice

**Logged**: 2026-05-08T12:14:11+05:30
**Priority**: medium
**Status**: applied
**Area**: tooling

### Summary
Serve local HTML over `127.0.0.1` for `browser-use` instead of opening `file://` URLs directly.

### Details
In this environment, `browser-use open file:///.../system.html` changed the URL but returned an empty DOM and a tiny blank screenshot. Serving the same directory with `python3 -m http.server --bind 127.0.0.1` and opening the HTTP URL produced the expected page state and screenshot.

### Suggested Action
For future local HTML checks, start a local static server, open the HTTP URL, and verify with `browser-use state`.

### Metadata
- Source: error
- Related Files: `/Users/denzil/.agents/skills/browser-use/SKILL.md`, `tasks/lessons.md`
- Tags: browser-use, local-html, tooling

---

## [LRN-20260508-002] correction

**Logged**: 2026-05-08T12:14:11+05:30
**Priority**: medium
**Status**: applied
**Area**: tooling

### Summary
The bundled in-app Browser Use skill can reference a Node REPL API that is not exposed in the current Codex toolset.

### Details
The available browser tools in this session are `mcp__browser_use__.*`, not `mcp__node_repl__js`. The local bundled skill now records that compatibility path so future browser work can proceed instead of failing on missing Node REPL access.

### Suggested Action
When the Node REPL browser-client path is unavailable but `mcp__browser_use__` tools exist, use those MCP browser tools directly.

### Metadata
- Source: error
- Related Files: `/Users/denzil/.codex/plugins/cache/openai-bundled/browser-use/0.1.0-alpha1/skills/browser/SKILL.md`
- Tags: browser-use, codex, tooling

---

## [LRN-20260502-001] correction

**Logged**: 2026-05-02T20:59:20+05:30
**Priority**: high
**Status**: pending
**Area**: process

### Summary
Treat this repository as a personal project even though it lives under `~/Projects/personal/public`.

### Details
The user explicitly corrected the default path-based WORK-mode assumption. For this repo, use PERSONAL mode: explore, implement, iterate, and avoid heavy planning overhead unless the task itself truly needs it.

### Suggested Action
Prefer lightweight task tracking and autonomous execution for this project.

### Metadata
- Source: user_feedback
- Related Files: AGENTS.md
- Tags: mode, workflow

---

## [LRN-20260510-001] best_practice

**Logged**: 2026-05-10T14:00:00Z
**Priority**: critical
**Status**: pending
**Area**: frontend

### Summary
Autopilot LLM corrupts App.tsx by inserting empty `if (soundEnabled) {` blocks, leaving function bodies unclosed.

### Details
The corruption pattern: autopilot tries to add a sound call, inserts `if (soundEnabled) {` with an empty body (no `playX()` call inside), then the existing `setTimeout`/`return` lines are counted as closing the if-block, but the actual **function body** never gets its `}`. This happened to `unlockAchievement`, `unlockSpecies`, and `checkSpeciesUnlocks` in one session. The Python brace tracer (with correct template literal handling) is the right tool to diagnose: look for depth-1 blocks that open (1→2) without a corresponding close (2→1).

### Suggested Action
1. Add to autopilot system.md: "Never add empty `if (soundEnabled) {` blocks — use single-line `if (soundEnabled) playX();` instead."
2. Before every autopilot commit, run `npm run build` and require it to pass.
3. After any App.tsx edit, run the depth tracer script to verify brace balance.

### Metadata
- Source: conversation
- Related Files: apps/desktop/src/App.tsx
- Tags: autopilot, syntax, corruption, brace-balance
- Pattern-Key: harden.autopilot_sound_block
- Recurrence-Count: 3
- First-Seen: 2026-05-10

---
