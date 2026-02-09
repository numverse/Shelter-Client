<script setup lang="ts">
import { computed } from "vue";

import { currentUser } from "../../stores/users";
import type { BaseUser } from "../../structures/BaseUser";

const props = defineProps<{
  user: BaseUser;
}>();

const isOffline = computed(() => {
  return !props.user.presence || props.user.presence.status === "offline";
});
</script>

<template>
  <div
    class="flex items-center justify-between hover:bg-bg3 p-1 rounded cursor-pointer"
    :class="{ offline: isOffline }"
  >
    <div class="relative mr-1">
      <img
        :src="user.avatarUrl"
        :class="['w-8 h-8 bg-cover bg-center rounded-full']"
      >
      <span
        v-if="user.presence?.status && user.presence.status !== 'offline' || user.id === currentUser?.id"
        :class="[
          'absolute top-5 left-5 right-0 w-4 h-4 rounded-full border-3 border-bg2',
          {
            'online': 'bg-green',
            'away': 'bg-yellow',
            'offline': 'bg-gray',
            'dnd': 'bg-red',
          }[user.presence?.status ?? 'offline']
        ]"
        aria-hidden="true"
      />
    </div>
    <div class="flex-1 flex flex-col ml-1">
      <p
        :class="['font-medium text-text1']"
      >
        {{ user.displayName }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.offline {
  filter: brightness(0.35);
}
.offline:hover {
  filter: brightness(1);
}
</style>
