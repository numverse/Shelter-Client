<script setup lang="ts">
import type { Component } from "vue";
import AppTooltip from "../common/AppTooltip.vue";

defineProps<{
  icon: Component;
  title: string;
  iconClass?: string;
  onClick: () => void;
}>();
</script>

<template>
  <AppTooltip
    :text="title"
    :position="'top'"
  >
    <component
      :is="icon"
      class="my-1 p-1 w-7 h-7 hover:bg-bg4 hover:text-white rounded cursor-pointer"
      :class="iconClass"
      :title="title"
      @click="onClick"
    />
  </AppTooltip>
</template>
