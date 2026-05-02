# Local Setup

## Status

The upstream `Alishahryar1/free-claude-code` project is imported and dependencies are installed with `uv`.

Local runtime config was created at `.env` and set to:

```env
MODEL="nvidia_nim/deepseek-ai/deepseek-v4-flash"
ANTHROPIC_AUTH_TOKEN="freecc"
ENABLE_MODEL_THINKING=false
NVIDIA_NIM_FORCE_NON_STREAMING=true
```

`NVIDIA_NIM_API_KEY` is set locally from an existing personal-project key. `.env` is ignored and must not be committed.

## Provider Research

Skipped by request: OpenRouter and Gemini.

Best allowed providers for this project:

1. NVIDIA NIM: best fit. It is OpenAI-compatible, has a free/trial API key path through `build.nvidia.com`, and exposes the strongest model catalog available to this proxy.
2. DeepSeek direct API: strong hosted option for DeepSeek models, but not the free path from the supplied guide.
3. LM Studio or Ollama: free local providers, but only useful if a strong local model is already running on local hardware.

Best model shortlist from current NVIDIA/free-catalog research:

1. `deepseek-ai/deepseek-v4-pro`: strongest candidate on paper, but timed out in local live tests.
2. `z-ai/glm-5.1`: supplied-guide model and strong coding/agentic candidate, but NVIDIA streaming timed out and non-streaming latency was inconsistent.
3. `qwen/qwen3.5-397b-a17b`: frontier open-weight candidate, exposed by NVIDIA, but timed out in local live tests.
4. `minimaxai/minimax-m2.7`: strong agentic workflow candidate, exposed by NVIDIA, but timed out in local live tests.
5. `deepseek-ai/deepseek-v4-flash`: not the smartest on paper, but the only tested Claude Opus-class-adjacent NVIDIA candidate that completed reliably enough to use as the project default.

Live model probes on this machine:

```text
deepseek-ai/deepseek-v4-flash: completed, proxy returned "proxy ok"
z-ai/glm-5.1: model access valid, but too slow/inconsistent through proxy
deepseek-ai/deepseek-v4-pro: timed out
qwen/qwen3.5-397b-a17b: timed out
minimaxai/minimax-m2.7: timed out
moonshotai/kimi-k2.6: timed out
```

NVIDIA compatibility notes:

- NVIDIA streaming returned no usable chunks for the tested top models.
- NVIDIA no-tool requests hung when `parallel_tool_calls` was sent.
- NVIDIA GLM-5.1 hung when optional thinking template fields were sent.
- This repo now supports `NVIDIA_NIM_FORCE_NON_STREAMING=true` to synthesize Anthropic SSE from a normal NVIDIA completion.

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
NVIDIA_NIM_FORCE_NON_STREAMING=true
ENABLE_MODEL_THINKING=false
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

## Sources

- NVIDIA API quickstart: `https://docs.api.nvidia.com/nim/docs/api-quickstart`
- NVIDIA free API catalog language: `https://build.nvidia.com/explore/discoverAPIs`
- NVIDIA GLM-5.1 reference: `https://docs.api.nvidia.com/nim/reference/z-ai-glm5.1`
- NVIDIA Qwen3.5 reference: `https://docs.api.nvidia.com/nim/reference/qwen-qwen3-5-397b-a17b`
- NVIDIA MiniMax M2.7 technical blog: `https://developer.nvidia.com/blog/minimax-m2-7-advances-scalable-agentic-workflows-on-nvidia-platforms-for-complex-ai-applications/`
