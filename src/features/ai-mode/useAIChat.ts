import { useState, useEffect } from "react";

import { getAIResponse } from "@/services/apiAI";
import { AI_CHAT_STORAGE_KEY, AI_HISTORY_LIMIT } from "@/lib/constants";
import { AIMessage } from "@/lib/types";

// Setting first message
const WELCOME_MESSAGE: AIMessage = {
  role: "ai",
  text: "Welcome,\nHow can I help you?",
};

export function useAIChat() {
  // Setting the chat history state, initializing from sessionStorage if present
  const [messages, setMessages] = useState<AIMessage[]>(() => {
    const stored = sessionStorage.getItem(AI_CHAT_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [WELCOME_MESSAGE];
  });

  // Saving history in storage with each new message
  useEffect(() => {
    sessionStorage.setItem(AI_CHAT_STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  // Send handler
  const handleSend = async (userMessage: string) => {
    // Add user message to the current messages
    const updatedMessages = [
      ...messages,
      { role: "user" as const, text: userMessage },
    ];

    // Update the messages state
    setMessages(updatedMessages);

    try {
      // Sending only the last messages, excluding the hardcoded welcome message
      const historyToSend = updatedMessages
        .filter((msg) => msg !== WELCOME_MESSAGE)
        .slice(-AI_HISTORY_LIMIT);

      // Fetching the AI response
      const aiText = await getAIResponse(historyToSend);

      // Add AI response to the history
      setMessages((prev) => [...prev, { role: "ai", text: aiText }]);
    } catch (error) {
      console.error(error);
    }
  };

  // Return the state and handler
  return { messages, handleSend };
}
