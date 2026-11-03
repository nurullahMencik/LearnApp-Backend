const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const NodeCache = require("node-cache");
const { buildTemplateRoadmap } = require("../config/roadmapTemplates");

const router = express.Router();

// Google AI API Configuration
const API_KEY = process.env.GOOGLE_API_KEY;
if (!API_KEY) {
  console.warn("⚠️ GOOGLE_API_KEY is not set in environment variables!");
}
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;
// gemini-1.5-* modelleri kullanımdan kaldırıldı; model ortam değişkeniyle değiştirilebilir
const MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";
const myCache = new NodeCache({ stdTTL: 300, checkperiod: 320 });

router.post("/generate", async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: "İçerik eksik." });
    }

    // API anahtarı yoksa hazır şablondan yol haritası üret (özellik her zaman çalışsın)
    if (!genAI) {
      return res.status(200).json({ success: true, generatedContent: buildTemplateRoadmap(content), source: "template" });
    }

    // Önbellek kontrol
    const cachedResponse = myCache.get(content);
    if (cachedResponse) {
      return res.status(200).json({ success: true, generatedContent: cachedResponse });
    }

    const model = genAI.getGenerativeModel({ model: MODEL });

    const systemMessage = `
Sen bir yazılım uzmanı gibi davran. Kullanıcı hangi alanda yol haritası isterse ona detaylı ama sade bir yol haritası ver.

Eğer "Backend öğrenmek istiyorum" derse:
- Hangi teknolojileri öğrenmesi gerektiğini sırayla yaz (örneğin: Git, Linux, Node.js, Express.js, MongoDB vs.)
- Hangi kaynaklardan çalışabileceğini öner
- Hangi projeleri yaparak pratiğe dökebileceğini yaz

Yanıtı sade, temiz ve adım adım ver.
Eğer kullanıcı frontend, mobil, siber güvenlik gibi başka bir alan isterse ona göre özelleştir.
Eğer konu ilgisizse şu cevabı ver:
"Yalnızca yazılım alanlarında yol haritası verebilirim (örneğin backend, frontend, mobil, oyun geliştirme)."

Eğer kullanıcı "sen kimsin" derse: 
"Ben yazılım yol arkadaşınım" cevabını ver.

Yapay zeka olduğunu söyleme.
`;

    const result = await model.generateContent([systemMessage, content]);
    const text = result.response.text();

    // Önbelleğe yaz
    myCache.set(content, text);

    res.status(200).json({
      success: true,
      generatedContent: text,
    });

  } catch (error) {
    // Model/kota hatasında kullanıcıya iç hata ayrıntısı göstermek yerine şablona düş
    console.error("❌ Yol Haritası AI Hatası:", error);
    res.status(200).json({
      success: true,
      generatedContent: buildTemplateRoadmap(req.body && req.body.content),
      source: "template",
    });
  }
});

module.exports = router;
