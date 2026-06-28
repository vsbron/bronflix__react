import { Helmet } from "react-helmet-async";

import Heading from "@/components/ui/Heading";
import AIChat from "@/features/ai-mode/AIChat";
import AIChatInput from "@/features/ai-mode/AIChatInput";

import { META_AI_DESC, META_AI_TITLE } from "@/lib/metaTags";

function AIMode() {
  // Returned JSX
  return (
    <>
      {/* Meta data */}
      <Helmet>
        <title>{META_AI_TITLE}</title>
        <meta name="description" content={META_AI_DESC} />
        <meta name="robots" content="noindex,nofollow" />
        <meta name="robots" content="index,follow" />
      </Helmet>

      {/* CONTENT */}
      <section>
        <Heading>AI Mode</Heading>
        <AIChat />
        <AIChatInput />
      </section>
    </>
  );
}

export default AIMode;
