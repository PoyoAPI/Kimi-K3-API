# Kimi K3 API: cURL quickstart

Call `/v1/chat/completions` with model `kimi-k3`:

```bash
export POYO_API_KEY="your-api-key"
export POYO_BASE_URL="https://api.poyo.ai"

curl -X POST "$POYO_BASE_URL/v1/chat/completions" \
  -H "Authorization: Bearer $POYO_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "model": "kimi-k3",
  "messages": [
    {
      "role": "system",
      "content": "You are a precise software architecture assistant."
    },
    {
      "role": "user",
      "content": "Design a migration checklist for splitting a monolith into three services."
    }
  ],
  "temperature": 0.2,
  "max_tokens": 900
}'
```

Keep the API key on your server. Add timeouts, bounded retries, and usage logging before production.

See the [full README](../README.md) and [production notes](../docs/production-notes.md).

