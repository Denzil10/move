#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

mkdir -p local/autopilot local/logs

cleanup() {
  if [[ -n "${PROXY_PID:-}" ]]; then
    kill "$PROXY_PID" 2>/dev/null || true
  fi
}
trap cleanup EXIT INT TERM

echo "Starting proxy on http://127.0.0.1:8082"
uv run uvicorn server:app --host 127.0.0.1 --port 8082 >local/logs/proxy.log 2>&1 &
PROXY_PID="$!"

for _ in {1..30}; do
  if curl -fsS http://127.0.0.1:8082/ >/dev/null 2>&1; then
    break
  fi
  sleep 1
done

if ! kill -0 "$PROXY_PID" 2>/dev/null; then
  echo "Proxy failed to start. See local/logs/proxy.log" >&2
  exit 1
fi

echo "Starting autopilot loop every 300 seconds"
uv run python scripts/autopilot_loop.py --interval-seconds "${AUTOPILOT_INTERVAL_SECONDS:-300}"
