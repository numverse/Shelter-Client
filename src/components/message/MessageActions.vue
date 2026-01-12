<script setup lang="ts">
import { TrashIcon, CornerUpLeft, Pencil, Ellipsis, SmilePlus } from "lucide-vue-next";
import MessageActionsItem from "./MessageActionsItem.vue";

import { deleteMessage as apiDeleteMessage } from "../../utils/api/messages/deleteMessage";

import { messageStore } from "../../stores/message";
import { stateStore } from "../../stores/state";

const props = defineProps<{
  id: string;
  channelId: string;
  isOwner: boolean;
  isAdmin: boolean;
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

const replyMessage = () => {
  stateStore.replyToMessageIdByChannel.set(props.channelId, props.id);
};

const addReaction = () => {

};

const editMessage = () => {

};
</script>

<template>
  <div class="px-1 absolute right-3 -top-4 opacity-0 group-hover:opacity-100 bg-bg3 border border-bg4 rounded flex">
    <MessageActionsItem
      :icon="SmilePlus"
      title="Add Reaction"
      icon-class="text-[#808080]"
      :on-click="addReaction"
    />
    <MessageActionsItem
      v-if="isOwner"
      :icon="Pencil"
      title="Edit"
      icon-class="text-[#808080]"
      :on-click="editMessage"
    />
    <MessageActionsItem
      :icon="CornerUpLeft"
      title="Reply"
      icon-class="text-[#808080]"
      :on-click="replyMessage"
    />
    <MessageActionsItem
      v-if="!stateStore.shiftHeld.value"
      :icon="Ellipsis"
      title="More"
      icon-class="text-[#808080]"
      :on-click="() => {}"
    />
    <MessageActionsItem
      v-if="stateStore.shiftHeld.value && (isOwner || isAdmin)"
      :icon="TrashIcon"
      title="Delete"
      icon-class="text-red"
      :on-click="deleteMessage"
    />
  </div>
</template>
