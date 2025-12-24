import { refreshTokens } from "../api/auth/refreshTokens";
import { BaseWebSocket } from "../ws/base";

let isAuthed = false;

const client = new BaseWebSocket("wss://shelter.zero624.dev/gateway");

client.on("open", () => {
  isAuthed = true;
});

client.on("close", async (evt) => {
  if (evt.reason === "AUTHENTICATION_REQUIRED") {
    const res = await refreshTokens();
    if (res.ok) {
      isAuthed = true;
      client.reconnect();
    } else {
      isAuthed = false;
    }
  }
});

export { isAuthed, client };
