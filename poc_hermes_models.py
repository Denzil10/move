#!/usr/bin/env python3
"""
POC: Test hermes tool execution with different models.
Compares auto-smart vs explicit models to find which works.
"""

import re
import subprocess

# Test query that requires tool execution
QUERY = """
You are a helpful assistant. You have access to tools.
Execute the code_execution tool to run: echo "test: $(date)" > /tmp/poc_test.txt
Then verify the file was created by reading it.
Be explicit about which tools you will use.
"""

MODELS = [
    "auto-smart",  # Current (broken?)
    "claude-opus-4.6",  # Known working for tools
    "gemini-2.0-flash",  # Alternative
]


def run_hermes(model: str, query: str) -> tuple[str, int]:
    """Run hermes with given model, return (output, exit_code)."""
    cmd = [
        "hermes",
        "chat",
        "--yolo",
        "-m",
        model,
        "-q",
        query,
    ]

    print(f"\n{'=' * 60}")
    print(f"Testing model: {model}")
    print(f"Command: {' '.join(cmd)}")
    print(f"{'=' * 60}")

    proc = subprocess.Popen(
        cmd,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
    )

    output, _ = proc.communicate()
    return output, proc.returncode


def extract_tool_calls(output: str) -> int:
    """Extract tool call count from hermes output."""
    # Look for "Messages: N (M user, K tool calls)"
    match = re.search(r"Messages:\s*\d+\s*\([^)]*?(\d+)\s+tool\s+calls?\)", output)
    if match:
        return int(match.group(1))
    return 0


def main():
    print("POC: Testing hermes tool execution with different models")
    print(f"Query: {QUERY[:100]}...")

    results = {}
    for model in MODELS:
        output, rc = run_hermes(model, QUERY)
        tool_calls = extract_tool_calls(output)

        results[model] = {
            "exit_code": rc,
            "tool_calls": tool_calls,
            "output_preview": output[:500] if output else "(empty)",
        }

        print(f"\nResult for {model}:")
        print(f"  Exit code: {rc}")
        print(f"  Tool calls: {tool_calls}")
        print(f"  First 300 chars: {output[:300] if output else '(empty)'}")

    print(f"\n{'=' * 60}")
    print("SUMMARY:")
    print(f"{'=' * 60}")
    for model, result in results.items():
        print(f"{model}: {result['tool_calls']} tool calls (rc={result['exit_code']})")

    # Check if file was actually created
    try:
        with open("/tmp/poc_test.txt") as f:
            content = f.read()
            print(f"\n✓ File created: {content}")
    except FileNotFoundError:
        print("\n✗ File NOT created - tools didn't execute")


if __name__ == "__main__":
    main()
