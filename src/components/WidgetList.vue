<script setup lang="ts">
import { CloudIcon, DollarSignIcon, MessageCircleIcon, MessagesSquareIcon } from "lucide-vue-next";
import WidgetItem from "./WidgetItem.vue";

import { useRouter } from "vue-router";
const router = useRouter();
</script>

<template>
  <aside class="bg-bg1 p-3 border-r border-bg3 h-full">
    <ul class="flex flex-col gap-3">
      <WidgetItem
        :icon="MessageCircleIcon"
        short-name="DM"
        label="Direct Messages"
        @click="router.push('/channels/@me')"
      />
      <WidgetItem
        :icon="MessagesSquareIcon"
        short-name="CHAT"
        label="Chat"
        @click="router.push('/channels')"
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
    </ul>
  </aside>
</template>
