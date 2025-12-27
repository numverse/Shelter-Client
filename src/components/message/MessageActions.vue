<script setup lang="ts">
import { TrashIcon } from "lucide-vue-next";
import MessageActionsItem from "./MessageActionsItem.vue";

defineProps<{
  isOwner: boolean;
  deleteMessage: () => void;
}>();
</script>

<template>
  <div class="absolute right-3 -top-4 opacity-0 group-hover:opacity-100 bg-bg3 border border-bg2 rounded flex gap-2">
    <MessageActionsItem
      v-if="isOwner"
      :icon="TrashIcon"
      title="Delete message"
      icon-class="text-red-500"
      :on-click="deleteMessage"
    />
  </div>
</template>
