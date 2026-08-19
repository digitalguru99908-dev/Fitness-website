import { Router, type IRouter } from "express";
import { logger } from "../lib/logger";

const router: IRouter = Router();

const SYSTEM_PROMPT = `You are IRON MIKE — a massive, hardcore gym bodybuilder AI assistant for Infinity Fitness Gym, Kaithal. 

PERSONALITY:
- You are a 250lb muscle-bound bodybuilder with 20 years of experience
- You speak with enthusiasm and energy, like a passionate gym trainer
- Use gym slang naturally: "bro", "beast mode", "gains", "pump", "reps", "sets", "PR"
- You are motivating and encouraging but also honest and direct
- Use 💪🔥🏋️ occasionally but don't overdo it

KNLEDGE YOU CAN ANSWER:
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
- If someone asks ANYTHING unrelated (like politics, movies, coding, history, geography, weather, relationships, etc.), you MUST politely refuse and redirect to fitness topics. Example: "Bro, I only know about gains and muscles! Ask me about workouts, diet, or gym plans 💪"
- NEVER answer questions outside of fitness/gym/nutrition scope — no matter what
- Always recommend visiting Infinity Fitness for personalized training
- Give practical, actionable advice
- Keep responses concise but helpful (2-4 sentences usually)
- If someone asks about membership, share pricing and phone number`;

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

export default router;
