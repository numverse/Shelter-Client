<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import UserItem from "./UserItem.vue";
import LoadingCircle from "../common/LoadingCircle.vue";

import { userStore } from "../../stores/users";

import type { User } from "../../utils/api/types";

const loading = ref(true);
const users = ref<Array<User>>([]);
const offlineUsers = ref<Array<User>>([]);

onMounted(async () => {
  if (userStore.userList.value.length === 0) {
    loading.value = true;
    await userStore.fetchAll();
    loading.value = false;
  } else {
    loading.value = false;
  }
  await nextTick();

  for (const id of userStore.userList.value) {
    const user = userStore.userDataMap.get(id);
    if (!user) continue;
    if (user.presence && user.presence.status !== "offline") {
      users.value.push(user);
    } else {
      offlineUsers.value.push(user);
    }
  }
});
</script>

<template>
  <aside class="w-64 bg-bg2 p-3 border-t border-l border-bg3">
    <h4 class="text-sm font-semibold">
      Members
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
              v-for="m in users"
              :key="m.id"
            >
              <UserItem
                :user-id="m.id"
                :username="m.username"
                :display-name="m.displayName"
                :avatar-id="m.avatarId"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
    <h4 class="text-sm font-semibold">
      Offline
    </h4>
    <div class="text-sm text-text2 mt-2">
      <div
        ref="scrollContainer"
        class="flex-1 overflow-auto h-full pb-4 bg-bg2"
      >
        <ul>
          <li
            v-for="m in offlineUsers"
            :key="m.id"
          >
            <UserItem
              :user-id="m.id"
              :username="m.username"
              :display-name="m.displayName"
              :avatar-id="m.avatarId"
            />
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>
