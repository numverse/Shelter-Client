<script setup lang="ts">
import { computed, watch, ref } from "vue";

const props = defineProps<{
  modelValue: boolean;
  title: string;
  message: string;
  messageAfter?: string;
  highlight?: string;
  confirmText: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "confirm"): void;
}>();

const visible = computed({
  get: () => props.modelValue,
  set: (v: boolean) => emit("update:modelValue", v),
});

const internalMessage = ref(props.message ?? "");
const internalMessageAfter = ref(props.messageAfter ?? "");

watch(() => props.message, (v) => {
  internalMessage.value = v ?? "";
});

watch(() => props.messageAfter, (v) => {
  internalMessageAfter.value = v ?? "";
});

function close() {
  visible.value = false;
}

function confirm() {
  emit("confirm");
  close();
}
</script>

<template>
  <transition name="fade">
    <div
      v-if="visible"
      class="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      <div
        class="absolute inset-0 bg-black/60"
        @click="close"
      />

      <div class="relative z-10 max-w-lg w-[90%] bg-[#1f1f22] border border-[#2b2b2f] rounded-xl shadow-2xl p-6 text-left">
        <h2 class="text-xl font-bold text-text1 mb-2">
          {{ title }}
        </h2>

        <div class="text-sm text-text2 mb-4 leading-relaxed">
          <p
            v-if="internalMessage || highlight || internalMessageAfter"
            class="whitespace-pre-wrap"
          >
            <span v-if="internalMessage">{{ internalMessage }} </span>
            <strong
              v-if="highlight"
              class="font-medium text-text1"
            >{{ highlight }}</strong>
            <span v-if="internalMessageAfter"> {{ internalMessageAfter }}</span>
          </p>
        </div>

        <div class="flex justify-end">
          <button
            class="px-4 py-2 bg-red hover:bg-red text-text1 rounded-md shadow"
            @click="confirm"
          >
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .18s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
