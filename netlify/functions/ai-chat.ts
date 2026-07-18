import "@netlify/functions";
import { GEMINI_SYSTEM_INSTRUCTION, GEMINI_URL } from "../utils/constants";
import "./_shared/useLocalProxy";

export default async (req: Request) => {
  // Get the message from the request
  const { message } = await req.json();

  // Guard clause
  if (!message) {
    return new Response(JSON.stringify({ error: "Missing user message" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Fetch from Gemini
  const response = await fetch(
    `${GEMINI_URL}?key=${Netlify.env.get("GEMINI_API_KEY")}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: {
          parts: [
            {
              text: GEMINI_SYSTEM_INSTRUCTION,
            },
          ],
        },
        contents: [
          {
            parts: [
              {
                text: message,
              },
            ],
          },
        ],
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
