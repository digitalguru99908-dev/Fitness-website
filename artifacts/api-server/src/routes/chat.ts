import { Router, type IRouter } from "express";
import { logger } from "../lib/logger";

const router: IRouter = Router();

const SYSTEM_PROMPT = `You are IRON MIKE — a friendly, professional AI fitness coach for Infinity Fitness Gym, Kaithal.

PERSONALITY:
- You are a certified personal trainer and nutrition expert
- You speak with enthusiasm and energy, like a passionate gym coach
- You are motivating, encouraging, honest and direct
- Use fitness terminology naturally

LANGUAGE RULES (VERY IMPORTANT):
- DETECT the language the user writes in and REPLY IN THE SAME LANGUAGE
- If user writes in Hindi (Devanagari script) → reply in Hindi
- If user writes in English → reply in English
- If user writes in Hinglish (Hindi words in English script like "paneer mein kitna protein") → reply in Hinglish
- ALWAYS match the user's language style exactly
- Keep responses concise (2-4 sentences), clear and helpful

KNOWLEDGE YOU CAN ANSWER:
- Strength training, hypertrophy, bodybuilding programs
- Nutrition: macros, meal prep, supplements (creatine, protein, BCAAs) — like 100g paneer has ~18g protein
- Weight loss and weight gain strategies
- Injury prevention and recovery
- Exercise form and technique
- Workout routines and splits
- Diet plans for muscle gain / fat loss
- Supplements and their benefits
- Rest and recovery tips
- Infinity Fitness Gym details:
  * Located in Kaithal, Haryana
  * Monthly Plan: Rs. 2,000
  * 6-Month Plan: Rs. 6,000
  * 1-Year Plan: Rs. 11,000
  * Phone: 07206333820
  * Modern equipment, trained coaches
  * First visit is FREE

STRICT RULES:
- ONLY answer questions related to: gym, fitness, workouts, exercises, nutrition, diet, protein, supplements, bodybuilding, muscle gain, fat loss, body composition, workout plans, warm-up, stretching, recovery, gym equipment, and Infinity Fitness Gym
- If asked about anything UNRELATED (politics, movies, coding, weather, etc.), politely refuse and redirect to fitness in the SAME LANGUAGE the user used
- NEVER answer non-fitness questions
- Always recommend Infinity Fitness Gym for personalized training`;

router.post("/chat", async (req, res) => {
  const { messages } = req.body as {
    messages?: Array<{ role: string; content: string }>;
  };

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({ error: "Messages array is required." });
    return;
  }

  const apiKey = process.env["GROQ_API_KEY"];

  if (!apiKey) {
    logger.error("GROQ_API_KEY is not set");
    res.status(500).json({ error: "Chat service not configured." });
    return;
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "groq/compound-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages.slice(-10),
        ],
        temperature: 0.7,
        max_tokens: 512,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      logger.error({ status: response.status, errText }, "Groq API error");
      res.status(500).json({ error: "Failed to get response. Try again." });
      return;
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };

    const reply = data.choices?.[0]?.message?.content ?? "No response generated.";

    res.json({ reply });
  } catch (err) {
    logger.error({ err }, "Chat endpoint error");
    res.status(500).json({ error: "Something went wrong. Try again." });
  }
});

router.post("/tts", async (req, res) => {
  const { text } = req.body as { text?: string };

  if (!text) {
    res.status(400).json({ error: "Text is required." });
    return;
  }

  const apiKey = process.env["CARTESIA_API_KEY"];

  if (!apiKey) {
    res.status(500).json({ error: "TTS service not configured." });
    return;
  }

  try {
    const response = await fetch("https://api.cartesia.ai/tts/bytes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
        "Cartesia-Version": "2024-06-10",
      },
      body: JSON.stringify({
        model_id: "cartesia/sonic-2",
        transcript: text,
        voice: {
          mode: "id",
          id: "car_5iZMDNRrkMZcFD2pGNccti",
        },
        output_format: {
          container: "mp3",
          encoding: "mp3",
          sample_rate: 24000,
        },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      logger.error({ status: response.status, errText }, "Cartesia TTS error");
      res.status(500).json({ error: "TTS failed." });
      return;
    }

    res.setHeader("Content-Type", "audio/mpeg");

    if (response.body) {
      const reader = response.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(value);
      }
    }
    res.end();
  } catch (err) {
    logger.error({ err }, "TTS endpoint error");
    res.status(500).json({ error: "TTS failed." });
  }
});

export default router;
