export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  var API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) return res.status(500).json({ error: "GEMINI_API_KEY not configured" });

  var items = req.body.items;
  var mode = req.body.mode;
  if (!items) return res.status(400).json({ error: "No items provided" });

  var prompt = mode === "web"
    ? "You are a pricing expert for Saudi Arabia market. Provide realistic current market prices in SAR.\n\n" + items + "\n\nCRITICAL: Return ONE JSON entry per item, in the EXACT SAME ORDER as listed above. Every item MUST have a unitPrice greater than 0.\nRespond ONLY with a valid JSON array, no other text:\n[{\"description\":\"item name\",\"unitPrice\":1234,\"source\":\"supplier or market\",\"notes\":\"basis\"}]"
    : "You are a pricing expert for contracting, electrical, and low current systems in Saudi Arabia (2024-2026 market prices in SAR).\n\nSCOPE RULES:\n- Supply & Install = material cost + installation labor\n- Installation Only = labor only (20-40% of full supply+install price)\n- Supply Only = material/equipment cost only\n\n" + items + "\n\nCRITICAL: Return ONE JSON entry per item, in the EXACT SAME ORDER as listed above. Every item MUST have a realistic unitPrice greater than 0 based on Saudi market.\nRespond ONLY with a valid JSON array, no other text:\n[{\"description\":\"item name\",\"unitPrice\":1234,\"confidence\":\"high\",\"notes\":\"price basis\"}]";

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
          generationConfig: { temperature: 0.2, maxOutputTokens: 8192 }
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
      var match = clean.match(/\[[\s\S]*\]/);

      if (match) {
        var parsed = JSON.parse(match[0]);
        if (parsed.length > 0 && parsed.some(function(p) { return p.unitPrice > 0; })) {
          return res.status(200).json({ results: parsed, mode: mode, model: model });
        }
      }
      lastError = model + " returned no prices";
      continue;
    } catch (e) {
      lastError = model + " error: " + e.message;
      continue;
    }
  }

  return res.status(500).json({ error: "All models failed. Last: " + lastError });
}
