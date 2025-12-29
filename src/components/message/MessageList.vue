<script setup lang="ts">
import { computed, ref, watch, onMounted, nextTick, onUnmounted } from "vue";
import { channelStore } from "../../stores/channel";
import MessageItem from "./MessageItem.vue";
import LoadingCircle from "../common/LoadingCircle.vue";

const loading = ref(true);
const scrollContainer = ref<HTMLElement | null>(null);

const messagesList = computed(() => {
  if (!channelStore.currentChannel.value?.id) return [];
  const ch = channelStore.channels.get(channelStore.currentChannel.value.id);
  if (!ch) return [];

  return Array.from(ch.messages.values());
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
  await channelStore.fetchChannelMessages({
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

watch(() => channelStore.currentChannel.value?.id, (id) => {
  if (id) loadMessages(id);
});

onMounted(async () => {
  if (channelStore.currentChannel.value?.id) await loadMessages(channelStore.currentChannel.value.id);
  scrollToBottom();
  window.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
});
</script>

<template>
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
        <li
          v-for="(m, i) in messagesList"
          :key="m.id"
        >
          <MessageItem
            :message="m"
            :channel-id="channelStore.currentChannel.value?.id!"
            :show-author="i === 0 || messagesList[i-1].authorId !== m.authorId"
          />
        </li>
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
