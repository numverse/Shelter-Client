<script setup lang="ts">
import { computed, ref, watch, onMounted, nextTick, onUnmounted } from "vue";
import { Hash } from "lucide-vue-next";

import MessageItem from "./MessageItem.vue";
import LoadingCircle from "../common/LoadingCircle.vue";

import { channelStore } from "../../stores/channel";
import { messageStore } from "../../stores/message";

const loading = ref(true);
const scrollContainer = ref<HTMLElement | null>(null);

const messagesList = computed(() => {
  if (!channelStore.currentChannelID.value) return [];
  if (!channelStore.channelDataMap.get(channelStore.currentChannelID.value || "")) {
    return [];
  }
  return messageStore.messageListByChannel.get(channelStore.currentChannelID.value) || [];
});

const currentChannel = computed(() => {
  return channelStore.channelDataMap.get(channelStore.currentChannelID.value || "");
});

const scrollToBottom = async () => {
  if (scrollContainer.value) {
    await nextTick();
    scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight;
  }
};

const isAtBottom = (threshold = 32) => {
  const el = scrollContainer.value;
  if (!el) return true;
  const distance = el.scrollHeight - (el.scrollTop + el.clientHeight);
  return distance <= threshold;
};

defineExpose({
  scrollToBottom,
  isAtBottom,
});

const loadMessages = async (channelId: string) => {
  loading.value = true;
  await messageStore.fetchChannelMessages({
    channelId,
    limit: "50",
  });
  loading.value = false;
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === "Escape") {
    scrollToBottom();
  }
};

watch(() => channelStore.currentChannelID.value, (id) => {
  if (id) loadMessages(id);
});

onMounted(async () => {
  if (channelStore.currentChannelID.value) await loadMessages(channelStore.currentChannelID.value);
  scrollToBottom();
  window.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
});
</script>

<template>
  <header class="px-4 py-3 bg-bg2 flex items-center border-t border-b border-bg3">
    <div class="flex items-center mr-1">
      <Hash
        class="w-5 h-5"
        color="grey"
      />
    </div>
    <div class="text-lg">
      {{ currentChannel?.name ?? '' }}
    </div>
  </header>
  <div
    ref="scrollContainer"
    class="flex-1 overflow-auto h-full pb-4 bg-bg2"
  >
    <div
      v-if="loading"
      class="flex flex-col items-center h-full"
    >
      <LoadingCircle class="w-12 h-12 text-accent" />
    </div>
    <div v-else>
      <ul
        v-if="messagesList.length"
      >
        <MessageItem
          v-for="id in messagesList"
          :id="id"
          :key="id"
        />
      </ul>
      <div
        v-else
        class="px-3 text-sm text-text-secondary"
      >
        No messages yet.
      </div>
    </div>
  </div>
</template>
