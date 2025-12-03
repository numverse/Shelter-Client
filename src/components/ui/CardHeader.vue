<script setup lang="ts">

defineOptions({
  name: "CardHeader",
});

const props = defineProps<{
  class?: string;
}>();
</script>

<template>
  <div
    v-bind="$attrs"
    :class="['flex flex-col space-y-1.5 p-6', props.class]"
  >
    <slot />
  </div>
</template>
