<script setup lang="ts">

defineOptions({
  name: "CardDescription",
});

const props = defineProps<{
  class?: string;
}>();
</script>

<template>
  <div
    v-bind="$attrs"
    :class="['text-sm', props.class]"
  >
    <slot />
  </div>
</template>
