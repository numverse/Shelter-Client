<script setup lang="ts">
import { computed } from "vue";
import { XIcon } from "lucide-vue-next";

import { stateStore } from "../../stores/state";

const notificationColors = {
  info: "bg-accent",
  error: "bg-red",
  success: "bg-green",
  warning: "bg-yellow",
};

const notificationHeader = computed(() => {
  return stateStore.notificationHeader.value;
});

</script>

<template>
  <div
    v-show="notificationHeader.text"
    :class="`ml-18 rounded-tl ${notificationColors[notificationHeader.type]} p-1 h-10 flex items-center justify-center relative`"
  >
    <div class="pr-18 flex flex-row items-center justify-center">
      {{ notificationHeader.text }}
      <div
        v-show="notificationHeader.actionButtonLabel"
        class="border border-text1 text-text1 px-1 py-1 text-sm rounded hover:bg-text1/20 ml-2 cursor-pointer"
        @click="notificationHeader.action"
      >
        {{ notificationHeader.actionButtonLabel }}
      </div>
    </div>
    <XIcon
      v-show="notificationHeader.closable"
      class="text-text1 cursor-pointer hover:bg-text1/20 rounded w-fit h-fit absolute right-1"
      @click="stateStore.closeNotificationHeader()"
    />
  </div>
</template>
