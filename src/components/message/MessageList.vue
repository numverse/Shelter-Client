<script setup lang="ts">
import { computed, ref, watch, onMounted, nextTick, onUnmounted } from "vue";
import { Hash } from "lucide-vue-next";

import MessageItem from "./MessageItem.vue";
import LoadingMessages from "./LoadingMessages.vue";

import { channelStore } from "../../stores/channel";
import { messageStore } from "../../stores/message";

const loading = ref(true);
const scrollContainer = ref<HTMLElement | null>(null);
const scrollThresholdID = ref<string | null>(null);

const scrollPositionMap = new Map<string, number>();

const saveScrollPosition = (channelId: string) => {
  if (scrollContainer.value) {
    scrollPositionMap.set(channelId, scrollContainer.value.scrollTop);
  }
};

const restoreScrollPosition = async (channelId: string) => {
  await nextTick();
  if (scrollContainer.value) {
    const savedPosition = scrollPositionMap.get(channelId);
    if (savedPosition !== undefined) {
      scrollContainer.value.scrollTop = savedPosition;
    } else {
      scrollToBottom();
    }
  }
};

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

const loadMessages = async (channelId: string, messageId?: string) => {
  loading.value = true;
  await messageStore.fetchChannelMessages({
    channelId,
    before: messageId,
    limit: "50",
  });
  loading.value = false;
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === "Escape") {
    scrollToBottom();
  }
};

watch(() => channelStore.currentChannelID.value, async (newId, oldId) => {
  if (oldId) saveScrollPosition(oldId);
  if (newId) {
    await loadMessages(newId);
    restoreScrollPosition(newId);
  }
});

onMounted(async () => {
  window.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
});

const hasMoreMessagesOnTop = computed(() => {
  const channelId = channelStore.currentChannelID.value;
  if (!channelId) return false;
  const messages = messageStore.messageListByChannel.get(channelId);
  if (!messages) return false;
  return messages[0] === "load-more";
});

const handleScroll = () => {
  enforceLoaderLimit();
};

const enforceLoaderLimit = () => {
  const el = scrollContainer.value;
  const id = scrollThresholdID.value;
  if (!el || !id) return;
  if (id.startsWith("load-more-before-")) {
    const threshold = el.querySelector<HTMLElement>(`#${id}`)?.offsetTop || null;
    if (!threshold) return scrollThresholdID.value = null;
    if (el.scrollTop < threshold) {
      el.scrollTop = threshold;
    }
  } else if (id.startsWith("load-more-after-")) {
    const loaderEl = el.querySelector<HTMLElement>(`#${id}`);
    if (!loaderEl) return scrollThresholdID.value = null;
    const threshold = el.scrollHeight - (loaderEl.offsetTop + loaderEl.clientHeight);
    if (el.scrollTop > threshold) {
      el.scrollTop = threshold;
    }
  }
};
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
    @scroll="handleScroll()"
  >
    <div class="flex flex-col min-h-full">
      <div class="flex-grow" />
      <div
        v-if="!hasMoreMessagesOnTop && !loading"
        class="flex flex-col gap-4 items-center justify-center mt-20 text-center text-text2 px-4"
      >
        <div class="flex items-center justify-center bg-bg3 rounded-full h-16 w-16">
          <Hash
            class="w-10 h-10"
            color="white"
          />
        </div>
        <h1 class="text-2xl font-semibold">
          Welcome to #{{ currentChannel?.name ?? '' }}!
        </h1>
        <h2 class="text-text2">
          This is the beginning of the #{{ currentChannel?.name ?? '' }} channel.
        </h2>
      </div>
      <div>
        <ul>
          <li
            v-for="(id, index) in messagesList"
            :id="id"
            :key="id"
          >
            <LoadingMessages
              v-if="id.startsWith('load-more-before-')"
              :scroll-root="scrollContainer"
              @show="loadMessages(currentChannel!.id, messagesList[index + 1]); scrollThresholdID = id"
              @hidden="scrollThresholdID = null"
            />
            <LoadingMessages
              v-else-if="id.startsWith('load-more-after-')"
              :scroll-root="scrollContainer"
              @show="loadMessages(currentChannel!.id, messagesList[index - 1]); scrollThresholdID = id"
              @hidden="scrollThresholdID = null"
            />
            <MessageItem
              v-else
              :id="id"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
