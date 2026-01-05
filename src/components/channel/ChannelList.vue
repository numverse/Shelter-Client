<script setup lang="ts">
import { channelStore } from "../../stores/channel";
import TextChannel from "./TextChannel.vue";
import VoiceChannel from "./VoiceChannel.vue";
import CategoryChannel from "./CategoryChannel.vue";
</script>

<template>
  <aside class="w-64 bg-bg1 border-l border-t border-bg3 rounded-b rounded-tl p-3 h-full">
    <h3 class="text-lg font-semibold mb-2">
      Channels
    </h3>
    <ul
      class="space-y-1"
    >
      <li
        v-for="id in channelStore.channelList.value"
        :id="id"
        :key="id"
      >
        <CategoryChannel
          v-if="channelStore.channelDataMap.get(id)?.type === 4"
          :id="id"
        />
        <TextChannel
          v-else-if="channelStore.channelDataMap.get(id)?.type === 0"
          :id="id"
        />
        <VoiceChannel
          v-else-if="channelStore.channelDataMap.get(id)?.type === 2"
          :id="id"
        />
      </li>
    </ul>
  </aside>
</template>
