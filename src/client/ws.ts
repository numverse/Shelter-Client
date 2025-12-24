import { refreshTokens } from "../utils/api/auth/refreshTokens";
import { createWebSocket } from "../utils/ws/base";
import { setAuthed } from "./auth";

const client = createWebSocket("wss://shelter.zero624.dev/gateway");

client.on("open", () => {
  setAuthed(true);
});

client.on("close", async (evt) => {
  if (evt.reason === "AUTHENTICATION_REQUIRED") {
    const res = await refreshTokens();
    if (res.ok) {
      setAuthed(true);
      client.reconnect();
    } else {
      setAuthed(false);
    }
  }
});

export { client };
