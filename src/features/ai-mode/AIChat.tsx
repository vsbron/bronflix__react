import AIChatMessage from "./AIChatMessage";

function AIChat() {
  // Returned JSX
  return (
    <div className="flex flex-col items-start gap-8 h-[600px] border border-main-color rounded-lg p-10 overflow-y-scroll">
      <AIChatMessage>
        Welcome,
        <br />
        How can I help you?
      </AIChatMessage>
      <AIChatMessage userMessage>Hey. What you can do?</AIChatMessage>
      <AIChatMessage>
        I can recommend you on the things to watch.
        <br />
        Help you find a specific movie, show or author.
        <br />
        Feel free to try me out!
      </AIChatMessage>
      <AIChatMessage userMessage>
        How many Die Hard movies out there?
      </AIChatMessage>
      <AIChatMessage>
        Die Hard franchise starring Bruce Willis contains <b>5</b> movies so
        far:
        <ul>
          <li>Die Hard (1988)</li>
          <li>Die Hard 2 (1990)</li>
          <li>Die Hard: With a Vengeance (1995)</li>
          <li>Live Free or Die Hard (2007)</li>
          <li>A Good Day to Die Hard (2013)</li>
        </ul>
      </AIChatMessage>
      <AIChatMessage userMessage>Thanks for the info</AIChatMessage>
      <AIChatMessage>
        No problem!
        <br />
        Talk to me if you need anything else
      </AIChatMessage>
    </div>
  );
}

export default AIChat;
