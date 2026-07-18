import ReactMarkdown from "react-markdown";

// Type props
type AIChatMessageProps = {
  children: React.ReactNode;
  userMessage?: boolean;
};

// Common CSS for pseudo elements
const afterClass =
  "after:absolute after:-bottom-[9px] after:h-0 after:w-0 after:border-b-[10px] after:border-b-transparent after:content-['']";

// The component
function AIChatMessage({ children, userMessage = false }: AIChatMessageProps) {
  // Returned JSX
  return (
    <div
      className={`text-xl max-w-[48%] ${userMessage ? "ml-auto text-right" : ""}`}
    >
      {userMessage ? "You:" : "BroNflix:"}
      <div
        className={`mt-1 py-4 px-8 text-3xl leading-snug rounded-md text-white relative ${afterClass} ${
          userMessage
            ? "bg-red-900 rounded-br-none after:right-0 after:border-r-[10px] after:border-r-red-900"
            : "bg-stone-800 rounded-bl-none after:left-0 after:border-l-[10px] after:border-l-stone-800"
        }`}
      >
        {userMessage ? (
          children
        ) : (
          <ReactMarkdown>{children as string}</ReactMarkdown>
        )}
      </div>
    </div>
  );
}

export default AIChatMessage;
