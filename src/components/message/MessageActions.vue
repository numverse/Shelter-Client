<script setup lang="ts">
import { TrashIcon } from "lucide-vue-next";
import MessageActionsItem from "./MessageActionsItem.vue";

import { deleteMessage as apiDeleteMessage } from "../../utils/api/messages/deleteMessage";

import { messageStore } from "../../stores/message";

const props = defineProps<{
  id: string;
  channelId: string;
  isOwner: boolean;
}>();

const deleteMessage = async () => {
  if (confirm("Delete this message?")) {
    const res = await apiDeleteMessage({
      channelId: props.channelId,
      messageId: props.id,
    });
    if (res.ok) {
      messageStore.deleteMessage(props.id);
    }
  }
};
</script>

<template>
  <div class="absolute right-3 -top-4 opacity-0 group-hover:opacity-100 bg-bg3 border border-bg2 rounded flex gap-2">
    <MessageActionsItem
      v-if="isOwner"
      :icon="TrashIcon"
      title="Delete message"
      icon-class="text-red"
      :on-click="deleteMessage"
    />
  </div>
</template>
