<script setup lang="ts">
import type { Component } from "vue";

defineProps<{
  label: string;
  shortName: string;
  icon: Component;
}>();
</script>

<template>
  <li
    class="w-12 h-14 flex gap-0.5 flex-col items-center justify-center rounded-md cursor-pointer bg-bg3 hover:bg-accent transition-colors duration-200"
    :title="label"
  >
    <component
      :is="icon"
      class="text-text1 w-8 h-8"
    />
    <p class="text-xs">
      {{ shortName }}
    </p>
  </li>
</template>
