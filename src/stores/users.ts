import { reactive, ref } from "vue";

import { getAllUsers } from "../utils/api/users/getAllUsers";
import { getCurrentUser } from "../utils/api/currentUser/getCurrentUser";

import { BaseUser } from "../structures/BaseUser";
import { CurrentUser } from "../structures/CurrentUser";

export const userDataMap = reactive(new Map<string, BaseUser>());
export const currentUser = ref<CurrentUser | null>(null);

export async function fetchAllUsers() {
  const allUsers = await getAllUsers();
  if (allUsers.ok) {
    userDataMap.clear();
    for (const user of allUsers.users) {
      userDataMap.set(user.id, new BaseUser(user));
    }
  }
}

export async function fetchCurrentUser() {
  const currentUserData = await getCurrentUser();
  if (currentUserData.ok) {
    currentUser.value = new CurrentUser(currentUserData);
  }
}
