// pages/api/ai-price.js
// This runs on the SERVER - API key is safe here

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) return res.status(500).json({ error: "API key not configured" });

  const { items, mode } = req.body; // mode: "ai" or "web"

  if (!items || !items.length) return res.status(400).json({ error: "No items provided" });

  try {
    const prompt = mode === "web"
      ? `You are a pricing expert. Search your knowledge for current market prices in Saudi Arabia (SAR) for these products. Use your knowledge of Saudi suppliers, distributors, and market prices.

Items to price:
${items}

IMPORTANT: Respond ONLY with a valid JSON array. No markdown, no backticks, no explanation before or after.
[{"description":"item name","unitPrice":number,"source":"market knowledge","notes":"price basis"}]

Focus on Saudi Arabia market prices in SAR. Be realistic and accurate.`
      : `You are a pricing expert for contracting, electrical, and low current systems in Saudi Arabia.

SCOPE RULES - Price based on the scope indicated:
- "Supply & Install" = full material + installation labor cost
- "Installation Only" = ONLY labor cost (20-40% of full price)  
- "Supply Only" = ONLY material cost
- "Service" = service/maintenance fees only

Items to price in SAR:
${items}

IMPORTANT: Respond ONLY with a valid JSON array. No markdown, no backticks, no explanation.
[{"description":"item name","unitPrice":number,"confidence":"high/medium/low","notes":"what is included in price based on scope"}]

Use Saudi Arabia 2024-2026 market prices. Be realistic.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 4096,
          },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API error:", response.status, errText);
      return res.status(response.status).json({ error: "Gemini API error", details: errText });
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    
    // Extract JSON from response
    const clean = text.replace(/```json|```/g, "").trim();
    const jsonMatch = clean.match(/\[[\s\S]*\]/);
    
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return res.status(200).json({ results: parsed, mode });
    } else {
      return res.status(200).json({ results: [], mode, raw: text });
    }
  } catch (error) {
    console.error("API route error:", error);
    return res.status(500).json({ error: error.message });
  }
}
