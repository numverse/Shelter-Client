import { getAllUsers } from "../utils/api/users/getAllUsers";
import { reactive } from "vue";
import { User } from "../utils/api/types";

const usersStore = {
  users: reactive<Map<string, User>>(new Map()),
  getUser: function (id: string) {
    return usersStore.users.get(id) ?? null;
  },
  fetchAll: async function () {
    const allUsers = await getAllUsers();
    if (allUsers.ok) {
      usersStore.users.clear();
      for (const user of allUsers.users) {
        usersStore.users.set(user.id, user);
      }
    }
  },
};

export { usersStore };
