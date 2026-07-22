import AIChatMessage from "@/features/ai-mode/AIChatMessage";

function TypingIndicator() {
  // Returned JSX
  return (
    <AIChatMessage raw>
      <div className="flex gap-2 py-2">
        <span className="w-3 h-3 rounded-full bg-stone-400 animate-bounce [animation-delay:-0.3s]" />
        <span className="w-3 h-3 rounded-full bg-stone-400 animate-bounce [animation-delay:-0.15s]" />
        <span className="w-3 h-3 rounded-full bg-stone-400 animate-bounce" />
      </div>
    </AIChatMessage>
  );
}

export default TypingIndicator;
