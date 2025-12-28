<script setup lang="ts">
import { ref } from "vue";

const model = defineModel<string>();

const input = ref<HTMLInputElement | null>(null);
const errorMessage = ref<string | null>(null);

const emit = defineEmits<{
  (e: "update:modelValue", v: string): void;
  (e: "blur", v?: string): void;
}>();

function onBlur() {
  emit("blur", input.value?.value);
}

function isValid() {
  return !!input.value && input.value.validity.valid;
}

function setErrorMessage(message: string | null) {
  errorMessage.value = message;
}

function focus() {
  input.value?.focus();
}

defineExpose({
  focus,
  isValid,
  setErrorMessage,
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
        class="text-red ml-1"
        aria-hidden="true"
      >*</span>
    </label>

    <input
      :id="id"
      ref="input"
      v-model="model"
      :type="type ?? 'text'"
      class="mt-1 text-xl w-full border border-text2/50 bg-bg1 rounded-sm p-2 focus:border-text1 transition-all duration-200 not-placeholder-shown:valid:border-accent not-placeholder-shown:invalid:border-red"
      :class="classes"
      :placeholder="placeholder"
      :minlength="minlength"
      :maxlength="maxlength"
      :required="required"
      :autofocus="autofocus"
      :pattern="pattern ? (pattern instanceof RegExp ? pattern.source : pattern) : undefined"
      autocomplete="off"
      @blur="onBlur"
    >

    <p
      v-if="errorMessage"
      class="mt-1 text-sm text-red"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>
