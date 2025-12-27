<script setup lang="ts">
import { computed, ref, watch, onMounted } from "vue";
import { channelsStore } from "../../stores/channels";
import MessageItem from "./MessageItem.vue";
import LoadingCircle from "../common/LoadingCircle.vue";

const loading = ref(true);

const messagesList = computed(() => {
  if (!channelsStore.currentChannel.value?.id) return [];
  const ch = channelsStore.channels.get(channelsStore.currentChannel.value.id);
  if (!ch) return [];

  return Array.from(ch.messages.values());
});

const loadMessages = async (channelId: string) => {
  loading.value = true;
  await channelsStore.fetchChannelMessages({
    channelId,
    limit: "50",
  });
  loading.value = false;
};

watch(() => channelsStore.currentChannel.value?.id, (id) => {
  if (id) loadMessages(id);
});
onMounted(() => {
  if (channelsStore.currentChannel.value?.id) loadMessages(channelsStore.currentChannel.value.id);
});
</script>

<template>
  <div class="flex-1 overflow-auto h-full bg-bg2">
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
            :channel-id="channelsStore.currentChannel.value?.id!"
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
