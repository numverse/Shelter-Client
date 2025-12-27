<script setup lang="ts">
import { Settings } from "lucide-vue-next";

defineProps({
  avatarId: {
    type: String,
    default: null,
  },
  username: {
    type: String,
    default: "Current User",
  },
  status: {
    type: String,
    default: "Online",
  },
});
</script>

<template>
  <section class="absolute flex bottom-0 left-0 flex-col bg-bg2 p-2 mb-4 ml-4 rounded w-73">
    <div class="flex items-center">
      <div
        v-if="avatarId"
        :style="`background-image: url('/cdn/avatars/${avatarId}.png')`"
        class="w-10 h-10 bg-cover bg-center rounded-full"
      />
      <div
        v-else
        class="w-10 h-10 bg-bg3 rounded-full flex items-center justify-center text-text2 font-semibold text-lg"
      >
        {{ username.charAt(0).toUpperCase() }}
      </div>
      <div class="flex-1 flex flex-col ml-1">
        <p class="font-medium text-white">
          {{ username }}
        </p>
        <p class="text-sm text-text2">
          {{ status }}
        </p>
      </div>
      <div>
        <button class="ml-4 p-1 rounded hover:bg-bg3">
          <Settings class="w-6 h-6 text-text2 ml-full" />
        </button>
      </div>
    </div>
  </section>
</template>
