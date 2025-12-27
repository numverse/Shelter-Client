<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: "Shelter Chat",
  },
});
</script>

<template>
  <div class="w-full h-7 text-white">
    <div class="h-full flex items-center justify-center">
      <p class="truncate text-sm sm:text-base text-center">
        {{ title }}
      </p>
    </div>
  </div>
</template>
