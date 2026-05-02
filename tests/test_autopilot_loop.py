import httpx

from scripts.autopilot_loop import _response_text


def test_response_text_reads_json_anthropic_content() -> None:
    response = httpx.Response(
        200,
        headers={"content-type": "application/json"},
        json={"content": [{"type": "text", "text": "cycle ok"}]},
    )

    assert _response_text(response) == "cycle ok"


def test_response_text_reads_sse_text_deltas() -> None:
    response = httpx.Response(
        200,
        headers={"content-type": "text/event-stream"},
        text=(
            'event: content_block_delta\n'
            'data: {"type":"content_block_delta","delta":{"type":"text_delta","text":"cycle "}}\n\n'
            'event: content_block_delta\n'
            'data: {"type":"content_block_delta","delta":{"type":"text_delta","text":"ok"}}\n\n'
            "data: [DONE]\n"
        ),
    )

    assert _response_text(response) == "cycle ok"


def test_response_text_rejects_empty_success_body() -> None:
    response = httpx.Response(200, text="")

    try:
        _response_text(response)
    except ValueError as exc:
        assert "empty body" in str(exc)
    else:
        raise AssertionError("empty success body should fail clearly")
