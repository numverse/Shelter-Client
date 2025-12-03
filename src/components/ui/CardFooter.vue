<script setup lang="ts">

defineOptions({
  name: "CardFooter",
});

const props = defineProps<{ class?: string }>();
</script>

<template>
  <div
    v-bind="$attrs"
    :class="['flex items-center p-6 pt-0', props.class]"
  >
    <slot />
  </div>
</template>
