// API for sending a message to the AI chat
export async function getAIResponse(
  message: string,
  signal?: AbortSignal,
): Promise<string> {
  try {
    // Fetching the AI response through serverless function
    const response = await fetch("/.netlify/functions/ai-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
      signal,
    });

    // Guard clause
    if (!response.ok) {
      throw new Error(
        `Failed to fetch the AI response: ${response.statusText}`,
      );
    }

    // Getting the actual data
    const data = await response.json();

    // Return the AI text
    return data.candidates[0].content.parts[0].text;
  } catch (error: unknown) {
    console.error(error);
    throw new Error("An error occurred while fetching the AI response");
  }
}
