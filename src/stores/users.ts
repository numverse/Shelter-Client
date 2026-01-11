import { getAllUsers } from "../utils/api/users/getAllUsers";
import { reactive, ref } from "vue";
import { CurrentUser, User } from "../utils/api/types";
import { getCurrentUser } from "../utils/api/currentUser/getCurrentUser";

const userStore = {
  userDataMap: reactive(new Map<string, User>()),
  currentUser: ref<CurrentUser | null>(null),
  fetchAll: async function () {
    const allUsers = await getAllUsers();
    if (allUsers.ok) {
      userStore.userDataMap.clear();
      for (const user of allUsers.users) {
        userStore.userDataMap.set(user.id, user);
      }
    }
  },
  fetchCurrentUser: async function () {
    const currentUser = await getCurrentUser();
    if (currentUser.ok) {
      this.currentUser.value = currentUser;
    }
  },
};

export { userStore };
