type AIChatMessageProps = {
  children: React.ReactNode;
  userMessage?: boolean;
};

function AIChatMessage({ children, userMessage = false }: AIChatMessageProps) {
  // Returned JSX
  return (
    <div
      className={`text-xl max-w-[48%] ${userMessage ? "ml-auto text-right" : ""}`}
    >
      {userMessage ? "You:" : "BroNflix:"}
      <div
        className={`mt-1 py-4 px-8 text-3xl leading-snug rounded-md text-white relative ${userMessage ? "bg-red-900 rounded-br-none" : "bg-stone-800 rounded-bl-none"}`}
      >
        {children}
      </div>
    </div>
  );
}

export default AIChatMessage;
