# Kimi K3 API: runnable cURL and Node.js examples

[![PoYo model page](https://img.shields.io/badge/Try%20on%20PoYo-kimi--k3--api-84cc16)](https://poyo.ai/models/kimi-k3) [![API docs](https://img.shields.io/badge/API-docs-22d3ee)](https://docs.poyo.ai/api-manual/chat-series/chat-completions) [![Check](https://github.com/PoyoAPI/kimi-k3-api/actions/workflows/check.yml/badge.svg)](https://github.com/PoyoAPI/kimi-k3-api/actions/workflows/check.yml)

Use Kimi K3 for long-context chat, coding, and agent workloads through PoYo's OpenAI-compatible chat endpoint.

**Answer:** To use the Kimi K3 API, send a server-side request to `POST https://api.poyo.ai/v1/chat/completions` with model `kimi-k3` and a PoYo API key. The examples in this repository are runnable with Node.js 22+ or cURL.

Last verified against the live PoYo schema and pricing on **August 9, 2026**.

## Quickstart

1. Create a key in the [PoYo dashboard](https://poyo.ai/dashboard/api-key).
2. Copy `.env.example` to `.env` and replace the placeholder.
3. Run `node node/index.mjs`.

```dotenv
POYO_API_KEY=YOUR_POYO_API_KEY_HERE
POYO_BASE_URL=https://api.poyo.ai
```

The complete cURL request is in [curl/generate.md](curl/generate.md). The Node.js example prints the complete JSON response.

## Model IDs

- `kimi-k3`

Use the exact IDs above. Product names and API model IDs are not always identical.

## Request fields

| Field | Requirement | Meaning |
| --- | --- | --- |
| model | required | kimi-k3. |
| messages | required | OpenAI-style role/content messages. |
| temperature | optional | Sampling temperature. |
| max_tokens | optional | Maximum generated tokens. |
| stream | optional | Enable streaming when your client supports SSE. |

## Pricing snapshot

| Usage | Price |
| --- | --- |
| Input | $2.28 per 1M tokens |
| Output | $11.40 per 1M tokens |

Pricing can change. Confirm the current amount on the [model page](https://poyo.ai/models/kimi-k3) before a production rollout.

## Best for

- long-context analysis
- coding assistants
- agent planning

## Important behavior

- Kimi K3 supports a context window of up to 1 million tokens; practical limits also depend on request and output settings.
- Send requests from a trusted backend so the API key never reaches browser code.
- Log request IDs and usage, not full sensitive prompts.

## Production guidance

Set an application timeout, retry only transient failures, cap output size, and record token usage. Do not put `POYO_API_KEY` in browser or mobile client code.

## Repository map

- [`curl/generate.md`](curl/generate.md) — copy-paste request
- [`node/index.mjs`](node/index.mjs) — dependency-free Node.js example
- [`docs/production-notes.md`](docs/production-notes.md) — limits and rollout checklist

## Links

- [Try Kimi K3 API on PoYo](https://poyo.ai/models/kimi-k3)
- [API reference](https://docs.poyo.ai/api-manual/chat-series/chat-completions)
- [All PoYo examples](https://github.com/PoyoAPI/poyo-examples)
- [PoYo model catalog](https://poyo.ai/models)

## License

MIT

