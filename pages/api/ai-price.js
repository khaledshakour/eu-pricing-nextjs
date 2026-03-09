// pages/api/ai-price.js
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) return res.status(500).json({ error: "GEMINI_API_KEY not configured" });

  const { items, mode } = req.body;
  if (!items) return res.status(400).json({ error: "No items provided" });

  const prompt = mode === "web"
    ? `You are a pricing expert. Provide current market prices in Saudi Arabia (SAR) for these products.

Items:
${items}

Respond ONLY with a valid JSON array, nothing else:
[{"description":"item name","unitPrice":1234,"source":"market knowledge","notes":"price basis"}]`
    : `You are a pricing expert for contracting and low current systems in Saudi Arabia.

SCOPE RULES:
- "Supply & Install" = material + labor
- "Installation Only" = labor only (20-40% of full)
- "Supply Only" = material only

Items:
${items}

Respond ONLY with a valid JSON array, nothing else:
[{"description":"item name","unitPrice":1234,"confidence":"high","notes":"what is included"}]`;

  const models = ["gemini-2.0-flash", "gemini-1.5-flash", "gemini-1.5-flash-latest", "gemini-pro"];

  for (const model of models) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.3, maxOutputTokens: 4096 },
          }),
        }
      );

      if (!response.ok) {
        console.error(`${model} failed: ${response.status}`);
        continue;
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
      const clean = text.replace(/```json|```/g, "").trim();
      const match = clean.match(/\[[\s\S]*?\]/);

      if (match) {
        return res.status(200).json({ results: JSON.parse(match[0]), mode, model });
      }
      return res.status(200).json({ results: [], mode, model });
    } catch (e) {
      console.error(`${model} error:`, e.message);
      continue;
    }
  }

  return res.status(500).json({ error: "All models failed. Check API key." });
}
