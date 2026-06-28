import Button from "@/components/ui/Button";

function AIChatInput() {
  // Returned JSX
  return (
    <div className="flex justify-end gap-6 items-center">
      <input
        type="text"
        className="input-styles w-full max-w-[600px]"
        placeholder="Write your question here..."
      />
      <Button type="submit">
        <span>Ask AI</span>
      </Button>
    </div>
  );
}

export default AIChatInput;
