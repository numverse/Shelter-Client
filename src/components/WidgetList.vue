<script setup lang="ts">
import { CloudIcon, DollarSignIcon, MessageCircleIcon, MessagesSquareIcon, PackageIcon } from "lucide-vue-next";
import WidgetItem from "./WidgetItem.vue";

import { stateStore } from "../stores/state";
</script>

<template>
  <aside class="bg-bg1 p-3 border-r border-bg3 h-full">
    <ul class="flex flex-col gap-3">
      <WidgetItem
        :icon="stateStore.chatMode.value === 'chat' ? MessagesSquareIcon : MessageCircleIcon"
        :short-name="stateStore.chatMode.value === 'chat' ? 'DM' : 'CHAT'"
        :label="stateStore.chatMode.value === 'chat' ? 'Direct Messages' : 'Chat'"
        @click="stateStore.toggleChatMode"
      />
      <li class="mx-2 my-1 border-b border-bg3" />
      <!-- example widgets for now, will be dynamic later -->
      <WidgetItem
        :icon="CloudIcon"
        short-name="WTHR"
        label="Weather"
      />
      <WidgetItem
        :icon="DollarSignIcon"
        short-name="EXCH"
        label="Exchange Rate"
      />
      <WidgetItem
        :icon="PackageIcon"
        short-name="TRACK"
        label="Package Tracking"
      />
    </ul>
  </aside>
</template>
