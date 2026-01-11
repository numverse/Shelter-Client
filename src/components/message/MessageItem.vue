<script setup lang="ts">
import { computed } from "vue";
import MessageActions from "./MessageActions.vue";

import { messageStore } from "../../stores/message";
import { userStore } from "../../stores/users";

import { i18nFormatTime } from "../../utils/i18n/i18n";
import { UserFlags } from "../../utils/api/types";

const props = defineProps<{
  id: string;
}>();

const messageData = computed(() => {
  return messageStore.messageDataMap.get(props.id);
});
const replyToMessage = computed(() => {
  if (!messageData.value?.replyTo) {
    return null;
  }
  return messageStore.messageDataMap.get(messageData.value.replyTo) || null;
});
const replyToMessageAuthor = computed(() => {
  if (!replyToMessage.value) {
    return null;
  }
  return userStore.userDataMap.get(replyToMessage.value.authorId) || null;
});

const isAuthor = computed(() => {
  return messageData.value?.authorId === userStore.currentUser.value?.id;
});

const messageAuthor = computed(() => {
  return userStore.userDataMap.get(messageData.value?.authorId || "");
});

const showAuthor = computed(() => {
  if (!messageData.value) {
    return false;
  }
  const channelMessages = messageStore.messageListByChannel.get(messageData.value.channelId) || [];
  const messageIndex = channelMessages.indexOf(messageData.value.id);
  if (messageIndex === 0) {
    return true;
  }
  const previousMessageId = channelMessages[messageIndex - 1];
  const previousMessage = messageStore.messageDataMap.get(previousMessageId);
  if (!previousMessage) {
    return true;
  }
  return previousMessage.authorId !== messageData.value.authorId || replyToMessage.value;
});

const scrollToRepliedMessage = () => {
  if (replyToMessage.value) {
    const el = document.getElementById(replyToMessage.value.id);
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      el.classList.add("bg-flash");
      setTimeout(() => {
        el.classList.remove("bg-flash");
      }, 2000);
    }
  }
};
</script>

<template>
  <div class="pr-8 pl-4 group relative text-lg font-light hover:bg-bg3/60">
    <div
      v-if="messageData?.replyTo"
      class="flex items-center ml-6 mt-4"
    >
      <div class="border-l-3 border-t-3 rounded-tl-lg border-bg4 w-9 h-4 self-end" />

      <img
        :src="replyToMessageAuthor?.avatarId ? `https://shelter.zero624.dev/cdn/avatars/${replyToMessageAuthor?.id}/${replyToMessageAuthor?.avatarId}.png` : `/avatars/${(BigInt(replyToMessageAuthor?.id ?? 0) >> 22n) % 6n}.png`"
        :alt="replyToMessageAuthor?.username"
        class="w-5 h-5 rounded-full mx-1"
      >
      <div class="flex items-center h-full">
        <span class="text-sm text-text2 py-1">
          {{ replyToMessageAuthor?.username || "Unknown User" }}
        </span>
        <span
          class="text-sm text-text2 py-1 ml-1"
          @click="scrollToRepliedMessage()"
        >
          {{ replyToMessage?.content }}
        </span>
      </div>
    </div>
    <div
      class="flex gap-3"
      :class="showAuthor ? replyToMessage ? '' : 'mt-4' : ''"
    >
      <img
        v-if="showAuthor"
        :src="messageAuthor?.avatarId ? `https://shelter.zero624.dev/cdn/avatars/${messageAuthor?.id}/${messageAuthor?.avatarId}.png` : `/avatars/${(BigInt(messageAuthor?.id ?? 0) >> 22n) % 6n}.png`"
        :alt="messageAuthor?.username"
        class="w-12 h-12 mt-0.5 absolute rounded-full"
      >

      <div class="flex flex-col flex-1 ml-16 select-text">
        <div
          v-if="showAuthor"
          class="flex items-center gap-2"
        >
          <span class="font-semibold text-text1">
            {{ messageAuthor?.username || "Unknown User" }}
          </span>
          <span class="text-xs mt-0.5 text-text2">
            {{ i18nFormatTime(messageData?.createdAt || "", undefined, true, true) }}
          </span>
        </div>

        <p
          :class="messageData?.status === 'SENDING' ? 'opacity-50' : messageData?.status === 'FAILED' ? 'text-red' : 'text-text1 opacity-100'"
          class="whitespace-break-spaces wrap-break-word leading-6 pb-0.5"
        >
          {{ messageData?.content }}
        </p>
        <span
          v-if="!showAuthor"
          class="text-xs mt-1 opacity-0 absolute -ml-16 group-hover:opacity-100 text-text2"
        >
          {{ i18nFormatTime(messageData?.createdAt || "") }}
        </span>

        <div
          v-if="messageData?.reactions?.length"
          class="flex gap-2 mt-2 flex-wrap"
        >
          <button
            v-for="reaction in messageData?.reactions"
            :key="reaction.emojiId"
            class="flex items-center gap-1 px-2 py-1 bg-bg3 rounded hover:bg-bg4 text-sm"
          >
            {{ reaction.emojiId }}
            <span class="text-xs text-text-secondary">{{ reaction.userIds.length }}</span>
          </button>
        </div>
      </div>

      <MessageActions
        :id="props.id"
        :key="props.id"
        :channel-id="messageData?.channelId!"
        :is-owner="isAuthor"
        :is-admin="((userStore.currentUser.value?.flags ?? 0) & UserFlags.MODERATOR) !== 0"
      />
    </div>
  </div>
</template>
