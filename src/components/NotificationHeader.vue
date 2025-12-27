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
  <transition name="slide-down">
    <div
      v-if="visible"
      class="w-full text-white"
    >
      <div class="bg-green-700 shadow-md">
        <div class="mx-auto flex items-center px-4 py-2 gap-4">
          <div class="flex-1" />

          <div class="flex items-center gap-4 flex-1 min-w-0 justify-center">
            <p class="truncate text-sm sm:text-base text-center">
              {{ message }}
            </p>
            <div class="hidden sm:flex items-center gap-2">
              <button
                class="border border-white text-white font-medium px-3 py-1 rounded hover:bg-green-800"
                @click="onAction"
              >
                {{ buttonLabel }}
              </button>
            </div>
          </div>

          <div class="flex items-center justify-end flex-1">
            <button
              type="button"
              class="text-white hover:text-gray-200 p-1 rounded focus:outline-none"
              aria-label="Close notification"
              @click="close"
            >
              <X />
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
