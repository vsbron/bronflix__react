import { ProxyAgent, setGlobalDispatcher } from "undici";
if (process.env.NETLIFY_DEV === "true") {
  setGlobalDispatcher(new ProxyAgent("http://127.0.0.1:10809"));
}
