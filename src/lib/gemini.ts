import { systemInstruction } from "@/data/fahri-knowledge";
import type { ChatMsg } from "./validation";

export class GeminiError extends Error {
  constructor(public status: number, msg: string) { super(msg); }
}

export async function askGemini(messages: ChatMsg[]): Promise<string> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new GeminiError(503, "not-configured");
  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 20000);
  try {
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": key },
      signal: ctrl.signal,
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemInstruction }] },
        contents: messages.map((m) => ({ role: m.role, parts: [{ text: m.content }] })),
        generationConfig: { temperature: 0.5, maxOutputTokens: 600 },
      }),
    });
    if (!r.ok) throw new GeminiError(r.status === 429 ? 429 : 502, `gemini-${r.status}`);
    const data = await r.json();
    const text = data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text || "").join("").trim();
    if (!text) throw new GeminiError(502, "empty");
    return text;
  } catch (e) {
    if (e instanceof GeminiError) throw e;
    throw new GeminiError(504, "timeout");
  } finally {
    clearTimeout(timer);
  }
}
