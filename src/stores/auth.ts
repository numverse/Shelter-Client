import { refreshTokens } from "../utils/api/auth/refreshTokens";
import { ref } from "vue";

const authStore = {
  authed: ref<boolean>(false),
  refreshTimestamp: 0,
  checkAuthed: async function (): Promise<boolean> {
    const res = await refreshTokens();
    if (!res.ok) {
      if (res.statusCode === 401
        || res.statusCode === 400
      ) {
        this.authed.value = false;
      }
    } else {
      this.authed.value = true;
    }
    return this.authed.value;
  },
  refreshTokens: async function (): Promise<boolean> {
    const res = await refreshTokens();
    if (res.ok) {
      this.authed.value = true;
      this.refreshTimestamp = Date.now();
    } else {
      this.authed.value = false;
    }
    return this.authed.value;
  },
};

export { authStore };
