<script setup lang="ts">
import { ref } from "vue";
import ChannelList from "../components/ChannelList.vue";
import MessageList from "../components/MessageList.vue";
import MessageInput from "../components/MessageInput.vue";
import type { Channel } from "../utils/api/types";

const selectedChannel = ref<Channel | null>(null);

function onSelectChannel(ch: Channel) {
  selectedChannel.value = ch;
}

</script>

<template>
  <div class="h-full flex">
    <ChannelList @select="onSelectChannel" />

    <div class="flex-1 flex flex-col">
      <header class="px-4 py-3 border-b border-bg-tertiary bg-bg-secondary flex items-center justify-between">
        <div class="text-lg font-semibold">
          {{ selectedChannel?.name ?? 'No channel selected' }}
        </div>
      </header>

      <MessageList
        :channel-id="selectedChannel?.id ?? null"
        class="flex-1"
      />

      <MessageInput :channel-id="selectedChannel?.id ?? null" />
    </div>

    <aside class="w-64 bg-bg-secondary p-3 border-l border-bg-tertiary">
      <h4 class="text-sm font-semibold">
        Members
      </h4>
      <div class="text-sm text-text-secondary mt-2">
        (Not implemented)
      </div>
    </aside>
  </div>
</template>
