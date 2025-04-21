// /api/generate.ts
import fetch from "node-fetch";

export default async function handler(req, res) {
  const { prompt, width = 512, height = 512, model = "default" } = req.body;
  
  if (!prompt) {
    return res.status(400).json({ error: "Missing prompt" });
  }

  try {
    // 用你的 JiMeng API 地址替换此 URL
    const response = await fetch("https://api.jimeng.com/v1/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.JIMENG_API_KEY}`,
      },
      body: JSON.stringify({
        prompt,
        width,
        height,
        model,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      return res.status(200).json({ imageUrl: result.imageUrl });
    } else {
      return res.status(500).json({ error: result.error || "Error generating image" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message || "Unknown error" });
  }
}
