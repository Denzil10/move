#!/usr/bin/env python3
"""POC: Test hermes behavior with system guidance and tool execution.

Goal: Understand why autopilot reads files but doesn't execute tools.
"""

import subprocess
from pathlib import Path


def run_hermes(task: str, system: str | None = None, max_turns: int = 1) -> dict:
    """Run hermes chat and capture output."""
    cmd = [
        "hermes",
        "chat",
        "--yolo",
        "-q",
        (system + "\n\n" + task) if system else task,
        "--max-turns",
        str(max_turns),
        "-Q",  # Quiet mode for programmatic use
    ]

    print(f"📍 Running: {' '.join(cmd[:6])}...")
    result = subprocess.run(
        cmd,
        cwd="/repos/move",
        capture_output=True,
        text=True,
        timeout=120,
    )

    return {
        "exit_code": result.returncode,
        "stdout_lines": len(result.stdout.split("\n")),
        "stderr": result.stderr[:200] if result.stderr else "",
        "output": result.stdout,
    }


def extract_tool_calls(output: str) -> int | None:
    """Extract tool call count from hermes output."""
    import re

    match = re.search(r"Messages:\s*\d+\s*\([^)]*?(\d+)\s+tool\s+calls?\)", output)
    return int(match.group(1)) if match else None


def main():
    print("🧪 POC: Hermes Behavior Analysis\n")

    # Test 1: Simple query without system guidance
    print("=" * 70)
    print("TEST 1: Simple query (no system guidance)")
    print("=" * 70)
    result = run_hermes(
        task="Look at the codebase and list 3 Python files that need improvement."
    )
    tool_calls = extract_tool_calls(result["output"])
    print(f"✓ Exit code: {result['exit_code']}")
    print(f"✓ Tool calls: {tool_calls}")
    print(f"✓ Output length: {result['stdout_lines']} lines")

    # Test 2: Query with explicit system guidance (read files)
    print("\n" + "=" * 70)
    print("TEST 2: With system guidance (read files)")
    print("=" * 70)
    result = run_hermes(
        system="You are a code reviewer. Use available tools to examine files.",
        task="Review src/main.js and identify 2 improvements.",
        max_turns=3,
    )
    tool_calls = extract_tool_calls(result["output"])
    print(f"✓ Exit code: {result['exit_code']}")
    print(f"✓ Tool calls: {tool_calls}")
    print(f"✓ Output length: {result['stdout_lines']} lines")

    # Test 3: Query with direct instruction to execute
    print("\n" + "=" * 70)
    print("TEST 3: Direct tool execution request")
    print("=" * 70)
    result = run_hermes(
        system="You MUST use tools to complete tasks. Do not summarize or read-only.",
        task="Create a file named 'test_poc.txt' in the current directory with content 'POC test'.",
        max_turns=3,
    )
    tool_calls = extract_tool_calls(result["output"])
    print(f"✓ Exit code: {result['exit_code']}")
    print(f"✓ Tool calls: {tool_calls}")
    print(f"✓ Output length: {result['stdout_lines']} lines")

    # Check if file was created
    test_file = Path("/repos/move/test_poc.txt")
    if test_file.exists():
        print(f"✓ FILE CREATED: {test_file.read_text()}")
        test_file.unlink()
    else:
        print("✗ File NOT created (tool wasn't executed)")

    # Test 4: Query with multi-turn capability
    print("\n" + "=" * 70)
    print("TEST 4: Multi-turn with file creation")
    print("=" * 70)
    result = run_hermes(
        system="You are an automation assistant. Use tools to complete all tasks.",
        task="""
1. First, read the file AGENTS.md
2. Then, create a summary file named poc_summary.txt
3. Write a 2-line summary into it
""",
        max_turns=5,
    )
    tool_calls = extract_tool_calls(result["output"])
    print(f"✓ Exit code: {result['exit_code']}")
    print(f"✓ Tool calls: {tool_calls}")
    print(f"✓ Output length: {result['stdout_lines']} lines")

    # Check if summary was created
    summary_file = Path("/repos/move/poc_summary.txt")
    if summary_file.exists():
        print(f"✓ SUMMARY CREATED:\n{summary_file.read_text()}")
        summary_file.unlink()
    else:
        print("✗ Summary NOT created")

    print("\n" + "=" * 70)
    print("📊 ANALYSIS")
    print("=" * 70)
    print("""
Key observations:
- If tool calls > 0: System guidance + -q flag allows tool execution
- If tool calls = 0: Agent only reads/summarizes without executing
- Problem hypothesis: Auto-smart model may be defaulting to read-only analysis
- Solution: Need system guidance to explicitly mandate tool usage

Next step: Check autopilot config and model selection (auto-smart provider).
""")


if __name__ == "__main__":
    main()
