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
  // Setting the chat history state, initializing from sessionStorage if present and loading state
  const [messages, setMessages] = useState<AIMessage[]>(() => {
    const stored = sessionStorage.getItem(AI_CHAT_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [WELCOME_MESSAGE];
  });
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);

    try {
      // Sending only the last messages, excluding the hardcoded welcome message
      const historyToSend = updatedMessages
        .filter((msg) => msg !== WELCOME_MESSAGE)
        .slice(-AI_HISTORY_LIMIT);

      // Fetching the AI response
      const aiText = await getAIResponse(historyToSend);

      // Format text for BroNflix UI
      const formattedText = convertLinks(aiText);

      // Add AI response to the history
      setMessages((prev) => [...prev, { role: "ai", text: formattedText }]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Return the state and handler
  return { messages, handleSend, isLoading };
}

// Fix for links in the AI response
function convertLinks(text: string): string {
  return text.replace(
    /\*\*(.+?):\*\*([^\n]*?)\s*(https?:\/\/vsbronflix\.netlify\.app\/\S+)/g,
    (_match, title, desc, url) => `**[${title}](${url}):**${desc}`,
  );
}
