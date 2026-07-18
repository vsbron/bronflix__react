import "@netlify/functions";
import { GEMINI_SYSTEM_INSTRUCTION, GEMINI_URL } from "../utils/constants";
import "./_shared/useLocalProxy";

export default async (req: Request) => {
  // Get the messages from the request
  const { messages } = await req.json();

  // Guard clause
  if (!messages || messages.length === 0) {
    return new Response(JSON.stringify({ error: "Missing chat messages" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Converting the chat history to Gemini's expected format
  const contents = messages.map((msg: { role: string; text: string }) => ({
    role: msg.role === "user" ? "user" : "model",
    parts: [{ text: msg.text }],
  }));

  // Fetch from Gemini
  const response = await fetch(
    `${GEMINI_URL}?key=${Netlify.env.get("GEMINI_API_KEY")}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: GEMINI_SYSTEM_INSTRUCTION }] },
        contents,
        generationConfig: {
          maxOutputTokens: 400,
          thinkingConfig: { thinkingBudget: 0 },
        },
      }),
    },
  );

  // Guard clause
  if (!response.ok) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch the AI response" }),
      {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  // Getting the actual data
  const data = await response.json();

  // Return the response with no caching
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
