import { FormEvent, useState } from "react";

import Button from "@/components/ui/Button";

// Prop type
type AIChatInputProps = {
  onSend: (message: string) => void;
  isLoading: boolean;
};

// The component
function AIChatInput({ onSend, isLoading }: AIChatInputProps) {
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

  // Returned JSX
  return (
    <div className="flex flex-col items-end">
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
        AI can make mistakes. Double-check important info.
      </div>
    </div>
  );
}

export default AIChatInput;
