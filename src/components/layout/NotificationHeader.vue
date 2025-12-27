<script setup lang="ts">
import { ref, watch } from "vue";
import { X } from "lucide-vue-next";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: true,
  },
  message: {
    type: String,
    default: "Please check your email to verify your account.",
  },
  buttonLabel: {
    type: String,
    default: "Resend Email",
  },
});
const emit = defineEmits(["update:modelValue", "action", "close"]);

const visible = ref(props.modelValue);
watch(() => props.modelValue, (v) => (visible.value = v));

function close() {
  visible.value = false;
  emit("update:modelValue", false);
  emit("close");
}

function onAction() {
  emit("action");
}
</script>

<template>
  <transition name="slide-up">
    <div
      v-if="visible"
      class="w-full h-10 text-white rounded-tl relative z-50 bg-green-700 shadow-md text-center px-4 flex items-center justify-center"
    >
      <button
        type="button"
        class="text-white hover:text-gray-200 h-full rounded focus:outline-none absolute right-3 top-0 flex items-center justify-center"
        aria-label="Close notification"
        @click="close"
      >
        <X />
      </button>
      {{ message }}
      <button
        class="border border-white text-white font-medium px-1 py-1 text-sm rounded hover:bg-green-800 ml-2"
        @click="onAction"
      >
        {{ buttonLabel }}
      </button>
    </div>
  </transition>
</template>
