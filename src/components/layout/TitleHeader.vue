<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: "Shelter Chat",
  },
});
</script>

<template>
  <div class="w-full h-7 text-text1">
    <div class="h-full flex items-center justify-center">
      <p class="truncate text-sm sm:text-base text-center">
        {{ title }}
      </p>
    </div>
  </div>
</template>
