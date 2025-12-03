<script setup lang="ts">

defineOptions({
  name: "CardContent",
});

const props = defineProps<{
  class?: string;
}>();
</script>

<template>
  <div
    v-bind="$attrs"
    :class="['p-6 pt-0', props.class]"
  >
    <slot />
  </div>
</template>
