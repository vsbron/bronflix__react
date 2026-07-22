import { FormEvent, useState } from "react";

import Button from "@/components/ui/Button";

// Prop type
type AIChatInputProps = {
  onSend: (message: string) => void;
  isLoading: boolean;
  onClear: () => void;
};

// The component
function AIChatInput({ onSend, isLoading, onClear }: AIChatInputProps) {
  // Create state value for controlled input value
  const [value, setValue] = useState("");

  // Submit handler
  const handleAI = async (e: FormEvent) => {
    // Prevent default behavior
    e.preventDefault();

    // Guard clause
    if (!value.trim()) return;

    // Send the message and clear the input
    onSend(value);
    setValue("");
  };

  // Clear chat handler
  const handleClear = () => {
    window.confirm("Clear chat history?") && onClear();
  };

  // Returned JSX
  return (
    <div className="flex flex-col xs:items-end">
      <form
        className="flex gap-4 relative w-full justify-end"
        onSubmit={(e) => handleAI(e)}
      >
        <input
          type="text"
          className="input-styles w-full max-w-[600px]"
          placeholder="Write your question here..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button type="submit" disabled={isLoading}>
          <span>Ask AI</span>
        </Button>
      </form>
      <div className="text-stone-500 text-[1.3rem] mt-2">
        AI can make mistakes. Double-check important info.{" "}
        <span className="block xs:inline-block">
          (
          <button
            type="button"
            onClick={handleClear}
            className="underline hover:text-stone-50 transition-colors duration-200"
          >
            Clear chat
          </button>
          )
        </span>
      </div>
    </div>
  );
}

export default AIChatInput;
