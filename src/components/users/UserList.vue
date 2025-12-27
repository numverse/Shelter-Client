<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import UserItem from "./UserItem.vue";
import LoadingCircle from "../common/LoadingCircle.vue";
import { usersStore } from "../../stores/users";

const loading = ref(true);

onMounted(async () => {
  if (usersStore.users.size === 0) {
    loading.value = true;
    await usersStore.fetchAll();
    loading.value = false;
  } else {
    loading.value = false;
  }
  await nextTick();
});
</script>

<template>
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
          v-for="(m ) in usersStore.users.values()"
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
</template>
