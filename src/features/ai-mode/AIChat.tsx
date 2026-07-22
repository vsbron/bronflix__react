import { useEffect, useRef } from "react";

import AIChatMessage from "@/features/ai-mode/AIChatMessage";
import TypingIndicator from "@/features/ai-mode/AITyping";

import { AIMessage } from "@/lib/types";

// Prop type
type AIChatProps = {
  messages: AIMessage[];
  isLoading: boolean;
};

// The component
function AIChat({ messages, isLoading }: AIChatProps) {
  // Create a reference for focusing
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom on new message
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  // Returned JSX
  return (
    <div
      ref={scrollRef}
      className="flex flex-col items-start gap-4 md:gap-8 h-full border border-main-color rounded-lg px-6 pt-5 pb-8 md:p-10 overflow-y-scroll"
    >
      {messages.map((msg, i) => (
        <AIChatMessage key={i} userMessage={msg.role === "user"}>
          {msg.text}
        </AIChatMessage>
      ))}

      {isLoading && <TypingIndicator />}
    </div>
  );
}

export default AIChat;
