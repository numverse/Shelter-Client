<script setup lang="ts">
import { ref, onMounted, nextTick, computed } from "vue";
import UserItem from "./UserItem.vue";
import LoadingCircle from "../common/LoadingCircle.vue";

import { userStore } from "../../stores/users";

import type { User } from "../../utils/api/types";

const loading = ref(true);
const userList = computed(() => {
  const users = Array.from(userStore.userDataMap.values());
  users.sort((a, b) => a.username.localeCompare(b.username));

  const onlineUsers: User[] = [];
  const offlineUsers: User[] = [];

  users.forEach((user) => {
    if (user.presence.status === "offline") {
      offlineUsers.push(user);
    } else {
      onlineUsers.push(user);
    }
  });

  return {
    onlineUsers,
    offlineUsers,
  };
});

onMounted(async () => {
  if (userStore.userDataMap.size === 0) {
    loading.value = true;
    await userStore.fetchAll();
    loading.value = false;
  } else {
    loading.value = false;
  }
  await nextTick();
});
</script>

<template>
  <aside class="w-64 bg-bg2 p-3 border-t border-l border-bg3">
    <h4 class="text-sm font-semibold text-[#808080]">
      Members — {{ userList.onlineUsers.length }}
    </h4>
    <div class="text-sm text-text2 mt-2">
      <div
        ref="scrollContainer"
        class="flex-1 overflow-auto h-full pb-4 bg-bg2"
      >
        <div
          v-if="loading"
          class="flex flex-col items-center h-full"
        >
          <LoadingCircle class="w-12 h-12 text-accent" />
        </div>
        <div v-else>
          <ul>
            <li
              v-for="m in userList.onlineUsers"
              :key="m.id"
            >
              <UserItem
                :user-id="m.id"
                :username="m.username"
                :display-name="m.displayName"
                :avatar-id="m.avatarId"
                :presence="m.presence"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
    <h4 class="text-sm font-semibold text-[#808080]">
      Offline — {{ userList.offlineUsers.length }}
    </h4>
    <div class="text-sm text-text2 mt-2">
      <div
        ref="scrollContainer"
        class="flex-1 overflow-auto h-full pb-4 bg-bg2"
      >
        <ul>
          <li
            v-for="m in userList.offlineUsers"
            :key="m.id"
          >
            <UserItem
              :user-id="m.id"
              :username="m.username"
              :display-name="m.displayName"
              :avatar-id="m.avatarId"
              :presence="m.presence"
            />
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>
