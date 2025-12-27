<script setup lang="ts">
import { computed } from "vue";
import { Message } from "../../utils/api/types";
import { channelsStore } from "../../stores/channels";
import { authStore } from "../../stores/auth";
import { deleteMessage as apiDeleteMessage } from "../../utils/api/messages/deleteMessage";
import { usersStore } from "../../stores/users";
import { i18nFormatTime } from "../../utils/i18n/i18n";

import MessageActions from "./MessageActions.vue";

const props = defineProps<{
  message: Message;
  channelId: string;
  showAuthor: boolean;
}>();

const isOwner = computed(() => {
  return props.message.authorId === authStore.currentUser.value?.id;
});

const messageAuthor = computed(() => {
  return usersStore.users.get(props.message.authorId);
});

const deleteMessage = async () => {
  if (confirm("Delete this message?")) {
    const res = await apiDeleteMessage({
      messageId: props.message.id,
    });
    if (res.ok) {
      channelsStore.deleteChannelMessage(props.channelId, props.message.id);
    }
  }
};
</script>

<template>
  <div class="px-4 hover:bg-bg3 group relative text-lg font-light">
    <div
      class="flex gap-3 justify-center items-center"
      :class="props.showAuthor ? 'mt-4' : ''"
    >
      <img
        v-if="props.showAuthor"
        :src="messageAuthor?.avatarId ? `/cdn/avatars/${messageAuthor?.id}/${messageAuthor?.avatarId}.png` : `/avatars/${(BigInt(messageAuthor?.id ?? 0) >> 22n) % 6n}.png`"
        :alt="messageAuthor?.username"
        class="w-12 h-12 rounded-full"
      >
      <div
        v-else
        class="w-12"
      />

      <div class="flex flex-col flex-1">
        <div
          v-if="props.showAuthor"
          class="flex items-center gap-2"
        >
          <span class="font-semibold text-text1">
            {{ messageAuthor?.username || "Unknown User" }}
          </span>
          <span class="text-xs text-text2">
            {{ i18nFormatTime(message.createdAt) }}
          </span>
        </div>

        <p class="text-text1">
          {{ message.content }}
        </p>

        <div
          v-if="message.reactions?.length"
          class="flex gap-2 mt-2 flex-wrap"
        >
          <button
            v-for="reaction in message.reactions"
            :key="reaction.emojiId"
            class="flex items-center gap-1 px-2 py-1 bg-bg3 rounded hover:bg-bg4 text-sm"
          >
            {{ reaction.emojiId }}
            <span class="text-xs text-text-secondary">{{ reaction.userIds.length }}</span>
          </button>
        </div>
      </div>

      <MessageActions
        :is-owner="isOwner"
        :delete-message="deleteMessage"
      />
    </div>
  </div>
</template>
