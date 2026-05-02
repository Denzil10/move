# Local Setup

## Status

The upstream `Alishahryar1/free-claude-code` project is imported and dependencies are installed with `uv`.

Local runtime config was created at `.env` and set to:

```env
MODEL="nvidia_nim/z-ai/glm-5.1"
ANTHROPIC_AUTH_TOKEN="freecc"
```

`NVIDIA_NIM_API_KEY` is intentionally still blank because no key was available in this shell.

## Get The NVIDIA Key

The provided guide is for `build.nvidia.com` and GLM-5.1:

1. Open `https://build.nvidia.com`.
2. Sign in or create an account.
3. Open the Models tab.
4. Select `glm-5.1` by Z.ai.
5. Click `View Code`.
6. Click `Generate API Key`.
7. Copy the `nvapi-...` key.

Then edit `.env`:

```env
NVIDIA_NIM_API_KEY="nvapi-your-key"
```

## Run

```bash
~/.local/bin/uv run uvicorn server:app --host 0.0.0.0 --port 8082
```

In another terminal:

```bash
ANTHROPIC_AUTH_TOKEN="freecc" ANTHROPIC_BASE_URL="http://localhost:8082" claude
```

Do not append `/v1` to `ANTHROPIC_BASE_URL`.
