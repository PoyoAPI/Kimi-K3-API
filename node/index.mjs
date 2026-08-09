import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

for (const envPath of [resolve(process.cwd(), ".env"), resolve(process.cwd(), "../.env")]) {
  if (!existsSync(envPath)) continue;
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const index = trimmed.indexOf("=");
    if (index < 0) continue;
    const key = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

const apiKey = process.env.POYO_API_KEY;
const baseUrl = process.env.POYO_BASE_URL || "https://api.poyo.ai";
if (!apiKey || apiKey === "YOUR_POYO_API_KEY_HERE") {
  console.error("Set POYO_API_KEY in your environment or repo-root .env file.");
  process.exit(1);
}

async function requestJson(path, options) {
  const response = await fetch(`${baseUrl}${path}`, options);
  const text = await response.text();
  let body = {};
  if (text) {
    try { body = JSON.parse(text); } catch { body = { raw: text }; }
  }
  const apiCode = Number(body?.code);
  const hasApiError = Number.isFinite(apiCode) && apiCode !== 0 && apiCode !== 200;
  if (!response.ok || hasApiError) {
    throw new Error(`PoYo request failed: ${JSON.stringify({ http_status: response.status, api_code: body?.code, body }, null, 2)}`);
  }
  return body;
}

const payload = {
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
};

const result = await requestJson("/v1/chat/completions", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify(payload),
});
console.log(JSON.stringify(result, null, 2));

