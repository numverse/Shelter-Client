import { refreshTokens } from "../utils/api/auth/refreshTokens";
import { BaseWebSocket } from "../utils/ws/base";
import { authStore } from "./auth";

const ws = new BaseWebSocket("wss://shelter.zero624.dev/gateway");

ws.on("open", () => {
  authStore.authed = true;
});

ws.once("close", async (evt) => {
  if (evt.reason === "AUTHENTICATION_REQUIRED") {
    const res = await refreshTokens();
    if (res.ok) {
      authStore.authed = true;
      ws.reconnect();
    } else {
      authStore.authed = false;
    }
  }
});

export { ws };
