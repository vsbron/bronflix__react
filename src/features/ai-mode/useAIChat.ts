import { useState } from "react";

import { AIMessage } from "@/lib/types";
import { getAIResponse } from "@/services/apiAI";

export function useAIChat() {
  // Setting the chat history state
  const [messages, setMessages] = useState<AIMessage[]>([
    { role: "ai", text: "Welcome,\nHow can I help you?" },
  ]);

  // Send handler
  const handleSend = async (userMessage: string) => {
    // Add user message to the history
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);

    try {
      // Fetching the AI response
      const aiText = await getAIResponse(userMessage);

      // Add AI response to the history
      setMessages((prev) => [...prev, { role: "ai", text: aiText }]);
    } catch (error) {
      console.error(error);
    }
  };

  // Return the state and handler
  return { messages, handleSend };
}
