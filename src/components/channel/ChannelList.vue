<script setup lang="ts">
import { channelStore } from "../../stores/channel";
import ChannelItem from "./ChannelItem.vue";
</script>

<template>
  <aside class="w-64 bg-bg1 border-l border-t border-bg3 rounded-b rounded-tl p-3 h-full">
    <h3 class="text-lg font-semibold mb-2">
      Channels
    </h3>
    <ul
      class="space-y-1"
    >
      <ChannelItem
        v-for="ch in channelStore.channels.values()"
        :id="ch.id"
        :key="ch.id"
        :name="ch.name"
      />
    </ul>
  </aside>
</template>
