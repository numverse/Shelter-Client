<script setup lang="ts">
import { TrashIcon } from "lucide-vue-next";

defineProps<{
  isOwner: boolean;
  deleteMessage: () => void;
}>();
</script>

<template>
  <div class="absolute right-3 top-3 opacity-0 group-hover:opacity-100 flex gap-2">
    <button
      v-if="isOwner"
      class="p-1 hover:bg-bg4 rounded text-red-500"
      title="Delete message"
      @click="deleteMessage"
    >
      <TrashIcon class="w-4 h-4" />
    </button>
  </div>
</template>
