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

  var models = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash", "gemini-pro"];
  var lastError = "";

  for (var i = 0; i < models.length; i++) {
    var model = models[i];
    try {
      var url = "https://generativelanguage.googleapis.com/v1beta/models/" + model + ":generateContent?key=" + API_KEY;
      
      var response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.3, maxOutputTokens: 4096 }
        })
      });

      if (!response.ok) {
        lastError = model + " status " + response.status;
        continue;
      }

      var data = await response.json();
      
      var text = "";
      if (data.candidates && data.candidates.length > 0) {
        var candidate = data.candidates[0];
        if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
          text = candidate.content.parts[0].text || "";
        }
      }
      
      var clean = text.replace(/```json/g, "").replace(/```/g, "").trim();
      var match = clean.match(/\[[\s\S]*?\]/);

      if (match) {
        return res.status(200).json({ results: JSON.parse(match[0]), mode: mode, model: model });
      }
      return res.status(200).json({ results: [], mode: mode, model: model });
    } catch (e) {
      lastError = model + " error: " + e.message;
      continue;
    }
  }

  return res.status(500).json({ error: "All models failed. Last: " + lastError });
}
