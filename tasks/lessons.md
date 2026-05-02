# Lessons

- `free-claude-code` validates provider credentials at app startup. For NVIDIA NIM models such as `nvidia_nim/z-ai/glm-5.1`, a missing `NVIDIA_NIM_API_KEY` blocks even health/root runtime startup beyond static tests.
- The configured browser instruction file `/Users/denzil/.agents/mcp/BROWSER_USAGE.md` is missing in this environment, so browser-account flows should not be improvised.
- On current NVIDIA NIM free endpoints, upstream streaming can emit no chunks for top models. For Claude-compatible clients, use `NVIDIA_NIM_FORCE_NON_STREAMING=true` and synthesize SSE from a normal completion.
- For NVIDIA no-tool chat requests, omit `parallel_tool_calls`; sending it can make otherwise valid non-streaming requests hang.
- For NVIDIA GLM-5.1, disable optional thinking template fields unless a live probe proves the endpoint returns promptly.
- Treat this repo as PERSONAL mode despite its path under `~/Projects/personal/public`; the user explicitly corrected the default WORK-mode assumption.
- Avoid `docker compose config` against compose files that load the real `.env`; it expands and prints secret-bearing environment values.
- Autopilot API callers must handle both Anthropic JSON responses and SSE `text_delta` responses from the local proxy.
- Docker images for this repo must exclude `.env`, `.claude/`, `local/`, and workspace state via `.dockerignore`; runtime secrets belong in compose `env_file`, not baked into the image.
- When pushing to a personal repo with multiple GitHub accounts, `gh auth switch` is not enough if the remote uses SSH; set the repo remote to HTTPS with `gh auth setup-git`, and ensure the active account token has `workflow` scope before pushing `.github/workflows/*`.
