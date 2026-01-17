<script setup lang="ts">
import { CloudIcon, DollarSignIcon, MessageCircleIcon, PackageIcon } from "lucide-vue-next";
import WidgetItem from "./WidgetItem.vue";

import { stateStore } from "../../stores/state";
</script>

<template>
  <aside class="bg-bg1 px-3 h-full fixed left-0 top-7">
    <ul class="flex flex-col gap-3.5">
      <li @click="() => stateStore.setChatMode('dm')">
        <WidgetItem
          :icon="MessageCircleIcon"
          label="Direct Messages"
        />
      </li>
      <li class="mx-2 border-b border-bg3" />
      <!-- example widgets for now, will be dynamic later -->
      <WidgetItem
        :icon="CloudIcon"
        label="Weather"
      />
      <WidgetItem
        :icon="DollarSignIcon"
        label="Exchange Rate"
      />
      <WidgetItem
        :icon="PackageIcon"
        label="Package Tracking"
      />
    </ul>
  </aside>
</template>
