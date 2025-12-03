<script setup lang="ts">

defineOptions({
  name: "CardTitle",
});

const props = defineProps<{
  class?: string;
}>();
</script>

<template>
  <div
    v-bind="$attrs"
    :class="['text-2xl font-semibold leading-none', props.class]"
  >
    <slot />
  </div>
</template>
