import { getAllUsers } from "../utils/api/users/getAllUsers";
import { ref } from "vue";
import { User } from "../utils/api/types";

const usersStore = {
  users: ref<User[]>([]),
  getUser: function (id: string) {
    return usersStore.users.value.find((ch) => ch.id === id) ?? null;
  },
  refresh: async function () {
    const allUsers = await getAllUsers();
    usersStore.users.value = allUsers.ok ? allUsers.users : [];
  },
};

export { usersStore };
