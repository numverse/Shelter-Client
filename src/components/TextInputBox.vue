<script setup lang="ts">
const model = defineModel<string>();

defineProps<{
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  minlength?: number;
  maxlength?: number;
  required?: boolean;
  classes?: string;
  autofocus?: boolean;
}>();
</script>

<template>
  <div>
    <label
      :for="id"
      class="font-semibold text-text1"
    >
      {{ label }}
    </label>

    <input
      :id="id"
      v-model="model"
      :type="type ?? 'text'"
      class="mt-1 text-xl w-full border border-text2/50 bg-bg1 rounded-sm p-2 focus:border-text1 transition-all duration-200 not-placeholder-shown:valid:border-accent not-placeholder-shown:invalid:border-red-500"
      :class="classes"
      :placeholder="placeholder"
      :minlength="minlength"
      :maxlength="maxlength"
      :required="required"
      :autofocus="autofocus"
      autocomplete="off"
    >
  </div>
</template>
