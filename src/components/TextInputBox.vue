<script setup lang="ts">
import { ref } from "vue";

const model = defineModel<string>();

const input = ref<HTMLInputElement | null>(null);

function isValid() {
  return !!input.value && input.value.validity.valid;
}
function reportValidity() {
  return input.value?.reportValidity() ?? false;
}

defineExpose({
  input,
  isValid,
  reportValidity,
  get value() {
    return model;
  },
});

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
  pattern?: string | RegExp;
  errorMessage?: string;
}>();
</script>

<template>
  <div>
    <label
      :for="id"
      class="font-semibold text-text1"
    >
      {{ label }}
      <span
        v-if="required"
        class="text-red-500 ml-1"
        aria-hidden="true"
      >*</span>
    </label>

    <input
      :id="id"
      ref="input"
      v-model="model"
      :type="type ?? 'text'"
      class="mt-1 text-xl w-full border border-text2/50 bg-bg1 rounded-sm p-2 focus:border-text1 transition-all duration-200 not-placeholder-shown:valid:border-accent not-placeholder-shown:invalid:border-red-500"
      :class="classes"
      :placeholder="placeholder"
      :minlength="minlength"
      :maxlength="maxlength"
      :required="required"
      :autofocus="autofocus"
      :pattern="pattern ? (pattern instanceof RegExp ? pattern.source : pattern) : undefined"
      autocomplete="off"
    >

    <p
      v-if="!isValid()"
      class="mt-1 text-sm text-red-500"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>
