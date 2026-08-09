# Kimi K3 API production notes

## Confirmed contract

- Endpoint: `POST /v1/chat/completions`
- Model ID: `kimi-k3`
- Authentication: `Authorization: Bearer <POYO_API_KEY>`

## Input limits

| Field | Requirement | Constraint |
| --- | --- | --- |
| model | required | kimi-k3. |
| messages | required | OpenAI-style role/content messages. |
| temperature | optional | Sampling temperature. |
| max_tokens | optional | Maximum generated tokens. |
| stream | optional | Enable streaming when your client supports SSE. |

## Operational checklist

- Keep API keys in a server-side secret manager.
- Validate user input before calling the API.
- Apply request timeouts and retry only rate limits or transient 5xx responses.
- Bound output tokens and log usage for cost control.
- Redact sensitive prompt and response content from logs.
- Recheck the live model page before hard-coding prices.

## Failure handling

Treat non-2xx HTTP responses and non-success API `code` values as errors. Preserve the HTTP status, API code, request ID when present, and a redacted response body for debugging.

Schema: [PoYo API documentation](https://docs.poyo.ai/api-manual/chat-series/chat-completions)

