"""Run the Move Dragon planner/executor loop against an Anthropic-compatible API."""

from __future__ import annotations

import argparse
import asyncio
import json
import os
from datetime import UTC, datetime
from pathlib import Path
from typing import Any

import httpx

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_PROMPT = ROOT / "autopilot" / "prompts" / "system.md"
DEFAULT_STATE_DIR = ROOT / "local" / "autopilot"


def _read(path: Path) -> str:
    if not path.exists():
        return ""
    return path.read_text(encoding="utf-8")


def _build_prompt() -> str:
    context_files = [
        DEFAULT_PROMPT,
        ROOT / "docs" / "business-autopilot.md",
        ROOT / "tasks" / "autopilot.md",
        ROOT / "docs" / "local-setup.md",
    ]
    sections = [f"## {path.relative_to(ROOT)}\n\n{_read(path)}" for path in context_files]
    return "\n\n".join(sections)


async def _run_once(client: httpx.AsyncClient, args: argparse.Namespace) -> str:
    payload = {
        "model": args.model,
        "max_tokens": args.max_tokens,
        "stream": False,
        "messages": [
            {
                "role": "user",
                "content": (
                    f"{_build_prompt()}\n\n"
                    "Run exactly one autopilot cycle now. Return concise sections: "
                    "Research, Execute, Review, Improve, Next."
                ),
            }
        ],
    }
    headers = {
        "authorization": f"Bearer {args.auth_token}",
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
    }
    response = await client.post("/v1/messages", headers=headers, json=payload)
    response.raise_for_status()
    return _response_text(response)


def _response_text(response: httpx.Response) -> str:
    body = response.text.strip()
    if not body:
        raise ValueError("provider returned HTTP 200 with an empty body")

    content_type = response.headers.get("content-type", "")
    if "application/json" in content_type:
        return _anthropic_json_text(response.json())

    chunks: list[str] = []
    for line in body.splitlines():
        if not line.startswith("data:"):
            continue
        payload = line.removeprefix("data:").strip()
        if payload == "[DONE]":
            continue
        try:
            event = json.loads(payload)
        except json.JSONDecodeError:
            continue
        text = _anthropic_event_text(event)
        if text:
            chunks.append(text)

    if chunks:
        return "".join(chunks)
    return body


def _anthropic_json_text(data: dict[str, Any]) -> str:
    blocks = data.get("content", [])
    return "\n".join(block.get("text", "") for block in blocks if block.get("type") == "text")


def _anthropic_event_text(event: dict[str, Any]) -> str:
    if event.get("type") != "content_block_delta":
        return ""
    delta = event.get("delta", {})
    if delta.get("type") != "text_delta":
        return ""
    text = delta.get("text", "")
    return text if isinstance(text, str) else ""


def _append_cycle(state_dir: Path, text: str) -> None:
    state_dir.mkdir(parents=True, exist_ok=True)
    record = {
        "timestamp": datetime.now(UTC).isoformat(),
        "output": text,
    }
    with (state_dir / "cycles.jsonl").open("a", encoding="utf-8") as handle:
        handle.write(json.dumps(record, ensure_ascii=True) + "\n")


async def _main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--interval-seconds", type=int, default=300)
    parser.add_argument("--once", action="store_true")
    parser.add_argument("--base-url", default=os.getenv("ANTHROPIC_BASE_URL", "http://127.0.0.1:8082"))
    parser.add_argument("--auth-token", default=os.getenv("ANTHROPIC_AUTH_TOKEN", "freecc"))
    parser.add_argument("--model", default=os.getenv("AUTOPILOT_MODEL", "sonnet"))
    parser.add_argument("--max-tokens", type=int, default=int(os.getenv("AUTOPILOT_MAX_TOKENS", "1600")))
    parser.add_argument("--state-dir", type=Path, default=DEFAULT_STATE_DIR)
    args = parser.parse_args()

    timeout = httpx.Timeout(connect=10.0, read=260.0, write=30.0, pool=10.0)
    async with httpx.AsyncClient(base_url=args.base_url.rstrip("/"), timeout=timeout) as client:
        while True:
            try:
                result = await _run_once(client, args)
                _append_cycle(args.state_dir, result)
                print(result, flush=True)
            except Exception as exc:
                _append_cycle(args.state_dir, f"ERROR: {exc}")
                print(f"ERROR: {exc}", flush=True)

            if args.once:
                return
            await asyncio.sleep(args.interval_seconds)


if __name__ == "__main__":
    asyncio.run(_main())
