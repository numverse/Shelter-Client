<script setup lang="ts">
import type { Component } from "vue";

defineProps<{
  icon: Component;
  title: string;
  iconClass?: string;
  onClick: () => void;
}>();
</script>

<template>
  <component
    :is="icon"
    class="p-1 w-8 h-8 hover:bg-bg4 rounded cursor-pointer"
    :class="iconClass"
    :title="title"
    @click="onClick"
  />
</template>
