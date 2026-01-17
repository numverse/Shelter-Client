<script setup lang="ts">
import AppTooltip from "../common/AppTooltip.vue";
import type { Component } from "vue";

defineProps<{
  label: string;
  icon: Component;
}>();
</script>

<template>
  <AppTooltip
    :bold="true"
    :text="label"
    :position="'right'"
  >
    <div class="w-10 h-10 mx-1 flex flex-col items-center justify-center rounded-md cursor-pointer bg-bg3 hover:bg-accent transition-colors duration-200">
      <component
        :is="icon"
        class="text-text1 w-6 h-6"
      />
    </div>
  </AppTooltip>
</template>
