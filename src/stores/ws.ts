import { refreshTokens } from "../utils/api/auth/refreshTokens";
import { BaseWebSocket } from "../utils/ws/base";
import { authStore } from "./auth";

const ws = new BaseWebSocket("wss://shelter.zero624.dev/gateway");

ws.on("open", () => {
  authStore.authed = true;
});

ws.on("close", async (evt) => {
  if (evt.reason === "AUTHENTICATION_REQUIRED") {
    const res = await refreshTokens().catch(() => ({
      ok: false,
    }));
    authStore.authed = res.ok;
  }

  if (authStore.authed) {
    setTimeout(() => {
      ws.reconnect();
    }, 1000);
  }
});

export { ws };
