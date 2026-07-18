import { useState, useEffect } from "react";

import { getAIResponse } from "@/services/apiAI";
import { AI_CHAT_STORAGE_KEY } from "@/lib/constants";
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
