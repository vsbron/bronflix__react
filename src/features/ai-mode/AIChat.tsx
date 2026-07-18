import { useEffect, useRef } from "react";

import AIChatMessage from "@/features/ai-mode/AIChatMessage";

import { AIMessage } from "@/lib/types";

// Prop type
type AIChatProps = {
  messages: AIMessage[];
};

// The component
function AIChat({ messages }: AIChatProps) {
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
      className="flex flex-col items-start gap-8 h-[600px] border border-main-color rounded-lg p-10 overflow-y-scroll"
    >
      {messages.map((msg, i) => (
        <AIChatMessage key={i} userMessage={msg.role === "user"}>
          {msg.text}
        </AIChatMessage>
      ))}
    </div>
  );
}

export default AIChat;
