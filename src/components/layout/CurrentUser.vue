<script setup lang="ts">
import { SettingsIcon } from "lucide-vue-next";
import { i18n } from "../../utils/i18n/i18n";
import { authStore } from "../../stores/auth";
</script>

<template>
  <section class="absolute flex bottom-0 left-0 flex-col bg-bg2 rounded w-76 m-3 p-3">
    <div class="flex items-center justify-between">
      <div class="relative">
        <img
          :src="authStore.currentUser.value?.avatarId ? `/cdn/avatars/${authStore.currentUser.value?.id}/${authStore.currentUser.value?.avatarId}.png` : `/avatars/${(BigInt(authStore.currentUser.value?.id ?? 0) >> 22n) % 6n}.png`"
          class="w-10 h-10 bg-cover bg-center rounded-full"
        >
        <span
          :class="[
            'absolute top-6 left-6 right-0 w-4.5 h-4.5 rounded-full border-3 border-bg2',
            {
              'online': 'bg-green',
              'idle': 'bg-yellow',
              'offline': 'bg-gray',
              'dnd': 'bg-red',
            }[authStore.currentUser.value?.presence?.status ?? 'online']
          ]"
          aria-hidden="true"
        />
      </div>
      <div class="flex-1 flex flex-col ml-1">
        <p class="font-medium text-text1">
          {{ authStore.currentUser.value?.username || i18n("ui", "username") }}
        </p>
        <p class="text-sm text-text2">
          Online
        </p>
      </div>
      <div>
        <button class="p-1 rounded hover:bg-bg3">
          <SettingsIcon class="w-6 h-6 cursor-pointer text-text2 ml-full hover:animate-spin" />
        </button>
      </div>
    </div>
  </section>
</template>
