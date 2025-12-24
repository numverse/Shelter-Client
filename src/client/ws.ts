import { refreshTokens } from "../utils/api/auth/refreshTokens";
import { createWebSocket } from "../utils/ws/base";
import { setAuthed } from "./auth";

const ws = createWebSocket("wss://shelter.zero624.dev/gateway");

ws.on("open", () => {
  setAuthed(true);
});

ws.on("close", async (evt) => {
  if (evt.reason === "AUTHENTICATION_REQUIRED") {
    const res = await refreshTokens();
    if (res.ok) {
      setAuthed(true);
      ws.reconnect();
    } else {
      setAuthed(false);
    }
  }
});

export { ws };
