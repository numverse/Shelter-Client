<script setup lang="ts">
import { computed, ref, watch, onMounted } from "vue";
import { channelsStore } from "../../stores/channels";
import MessageItem from "./MessageItem.vue";
import LoadingCircle from "../common/LoadingCircle.vue";

const props = defineProps<{ channelId: string | null }>();
const loading = ref(true);

const messagesList = computed(() => {
  if (!props.channelId) return [];
  const ch = channelsStore.channels.get(props.channelId);
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

watch(() => props.channelId, (id) => {
  if (id) loadMessages(id);
});
onMounted(() => {
  if (props.channelId) loadMessages(props.channelId);
});
</script>

<template>
  <div class="py-4 flex-1 overflow-auto h-full bg-bg2">
    <div
      v-if="loading"
      class="flex justify-center items-center h-full"
    >
      <LoadingCircle class="w-16 h-16 text-accent" />
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
            :channel-id="props.channelId!"
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
