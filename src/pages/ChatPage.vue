<script setup lang="ts">
import { onMounted } from "vue";
import ChannelList from "../components/ChannelList.vue";
import MessageList from "../components/MessageList.vue";
import MessageInput from "../components/MessageInput.vue";
import WidgetList from "../components/WidgetList.vue";

import { authStore } from "../stores/auth";
import { channelsStore } from "../stores/channels";

onMounted(async () => {
  await channelsStore.refresh();
  channelsStore.setChannel(channelsStore.channels.value[0]);

  setInterval(async () => {
    await authStore.refreshTokens();
  }, 240000);
});
</script>

<template>
  <div class="h-full flex">
    <WidgetList />
    <ChannelList />

    <div class="flex-1 flex flex-col">
      <header class="px-4 py-3 border-b border-bg3 bg-bg2 flex items-center justify-between">
        <div class="text-lg font-semibold">
          # {{ channelsStore.currentChannel.value?.name ?? 'No channel selected' }}
        </div>
      </header>

      <MessageList
        :channel-id="channelsStore.currentChannel.value?.id ?? null"
        class="flex-1"
      />

      <MessageInput :channel-id="channelsStore.currentChannel.value?.id ?? null" />
    </div>

    <aside class="w-64 bg-bg2 p-3 border-l border-bg3">
      <h4 class="text-sm font-semibold">
        Members
      </h4>
      <div class="text-sm text-text2 mt-2">
        (Not implemented)
      </div>
    </aside>
  </div>
</template>
