import { FormEvent, useState } from "react";

import Button from "@/components/ui/Button";

// Prop type
type AIChatInputProps = {
  onSend: (message: string) => void;
};

// The component
function AIChatInput({ onSend }: AIChatInputProps) {
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
    <div className="flex justify-end gap-6 items-center">
      <form
        className="flex gap-4 max-md:flex-row-reverse max-md:w-full relative w-full justify-end"
        onSubmit={(e) => handleAI(e)}
      >
        <input
          type="text"
          className="input-styles w-full max-w-[600px]"
          placeholder="Write your question here..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button type="submit">
          <span>Ask AI</span>
        </Button>
      </form>
    </div>
  );
}

export default AIChatInput;
