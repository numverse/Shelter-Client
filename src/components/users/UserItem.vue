<script setup lang="ts">
import { computed } from "vue";
import { userStore } from "../../stores/users";

const props = defineProps<{
  userId: string;
  username: string;
  displayName?: string;
  avatarId?: string;
  presence?: {
    status: "online" | "offline" | "away" | "dnd";
  };
}>();

const isOffline = computed(() => {
  return !props.presence || props.presence.status === "offline";
});
</script>

<template>
  <div
    class="flex items-center justify-between hover:bg-bg3 p-1 rounded cursor-pointer"
    :class="{ offline: isOffline }"
  >
    <div class="relative">
      <img
        :src="avatarId ? `https://shelter.zero624.dev/cdn/avatars/${userId}/${avatarId}.png` : `/avatars/${(BigInt(userId ?? 0) >> 22n) % 6n}.png`"
        :class="['w-10 h-10 bg-cover bg-center rounded-full']"
      >
      <span
        v-if="presence?.status && presence?.status !== 'offline' || userId === userStore.currentUser.value?.id"
        :class="[
          'absolute top-6 left-6 right-0 w-4.5 h-4.5 rounded-full border-3 border-bg2',
          {
            'online': 'bg-green',
            'away': 'bg-yellow',
            'offline': 'bg-gray',
            'dnd': 'bg-red',
          }[presence?.status ?? 'offline']
        ]"
        aria-hidden="true"
      />
    </div>
    <div class="flex-1 flex flex-col ml-1">
      <p
        :class="['font-medium text-text1']"
      >
        {{ displayName || username }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.offline {
  filter: brightness(0.6);
}
.offline:hover {
  filter: brightness(1);
}
</style>
