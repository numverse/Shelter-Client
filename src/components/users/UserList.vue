<script setup lang="ts">
import { ref, onMounted, nextTick, computed } from "vue";
import UserItem from "./UserItem.vue";
import LoadingCircle from "../common/LoadingCircle.vue";

import { userDataMap, fetchAllUsers } from "../../stores/users";

import type { BaseUser } from "../../structures/BaseUser";

const loading = ref(true);
const userList = computed(() => {
  const users = Array.from(userDataMap.values());
  users.sort((a, b) => a.displayName.localeCompare(b.displayName));

  const onlineUsers: BaseUser[] = [];
  const offlineUsers: BaseUser[] = [];

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
  if (userDataMap.size === 0) {
    loading.value = true;
    await fetchAllUsers();
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
                :user="m"
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
              :user="m"
            />
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>
