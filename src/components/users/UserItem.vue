<script setup lang="ts">

defineProps<{
  userId: string;
  username: string;
  displayName?: string;
  avatarId?: string;
}>();
</script>

<template>
  <div class="flex items-center justify-between">
    <img
      :src="avatarId ? `/cdn/avatars/${userId}/${avatarId}.png` : `/avatars/${(BigInt(userId ?? 0) >> 22n) % 6n}.png`"
      class="w-10 h-10 bg-cover bg-center rounded-full"
    >
    <div class="flex-1 flex flex-col ml-1">
      <p class="font-medium text-white">
        {{ displayName || username }}
      </p>
    </div>
  </div>
</template>
