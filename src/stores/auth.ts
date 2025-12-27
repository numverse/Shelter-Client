import { getCurrentUser } from "../utils/api/currentUser/getCurrentUser";
import { refreshTokens } from "../utils/api/auth/refreshTokens";
import { CurrentUser } from "../utils/api/types";
import { ref } from "vue";

const authStore = {
  authed: false,
  refreshTimestamp: 0,
  currentUser: ref<CurrentUser | null>(null),
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
  fetchCurrentUser: async function () {
    const currentUser = await getCurrentUser();
    if (currentUser.ok) {
      this.currentUser.value = currentUser;
    }
  },
};

export { authStore };
