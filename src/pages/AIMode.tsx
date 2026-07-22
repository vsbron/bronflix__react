import { Helmet } from "react-helmet-async";

import Heading from "@/components/ui/Heading";
import AIChat from "@/features/ai-mode/AIChat";
import AIChatInput from "@/features/ai-mode/AIChatInput";
import { useAIChat } from "@/features/ai-mode/useAIChat";

import { META_AI_DESC, META_AI_TITLE } from "@/lib/metaTags";

function AIMode() {
  // Get the messages, message handler from custom hook and loader
  const { messages, handleSend, handleClear, isLoading } = useAIChat();

  // Returned JSX
  return (
    <>
      {/* Meta data */}
      <Helmet>
        <title>{META_AI_TITLE}</title>
        <meta name="description" content={META_AI_DESC} />
      </Helmet>

      {/* CONTENT */}
      <section className="h-[100%] flex flex-col">
        <Heading>AI Mode</Heading>
        <div className="flex flex-col gap-8 h-[calc(100dvh-130px)] md:h-[calc(100dvh-100px)]">
          <AIChat messages={messages} isLoading={isLoading} />
          <AIChatInput onSend={handleSend} isLoading={isLoading} onClear={handleClear} />
        </div>
      </section>
    </>
  );
}

export default AIMode;
