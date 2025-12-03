<script setup lang="ts">

defineOptions({
  name: "CardItem",
});

const props = defineProps<{
  class?: string;
}>();

</script>

<template>
  <div
    v-bind="$attrs"
    :class="['rounded-xl border shadow-sm', props.class]"
  >
    <slot />
  </div>
</template>
