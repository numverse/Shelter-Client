import { refreshTokens } from "../utils/api/auth/refreshTokens";

const authStore = {
  authed: false,
  refreshTimestamp: 0,
  checkAuthed: async function (): Promise<boolean> {
    const res = await refreshTokens();
    if (!res.ok) {
      if (res.statusCode === 401) {
        this.authed = false;
      }
    } else {
      this.authed = true;
    }
    return this.authed;
  },
  refreshTokens: async function (): Promise<boolean> {
    const res = await refreshTokens();
    if (res.ok) {
      this.authed = true;
      this.refreshTimestamp = Date.now();
    } else {
      this.authed = false;
    }
    return this.authed;
  },
};

export { authStore };
