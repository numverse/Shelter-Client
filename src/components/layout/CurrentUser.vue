<script setup lang="ts">
import { SettingsIcon } from "lucide-vue-next";
import { i18n } from "../../utils/i18n/i18n";

defineProps<{
  username?: string;
  avatarId?: string;
}>();
</script>

<template>
  <section class="absolute flex bottom-0 left-0 flex-col bg-bg2 rounded w-76 m-3 p-3">
    <div class="flex items-center justify-between">
      <img
        :src="avatarId ? `/cdn/avatars/${avatarId}.png` : '/shelter_logo.png'"
        class="w-10 h-10 bg-cover bg-center rounded-full"
      >
      <div class="flex-1 flex flex-col ml-1">
        <p class="font-medium text-white">
          {{ username || i18n("ui", "username") }}
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
