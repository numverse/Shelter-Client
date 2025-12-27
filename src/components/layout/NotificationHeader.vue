<script setup lang="ts">
import { XIcon } from "lucide-vue-next";

defineProps<{
  message: string | null;
  buttonLabel?: string;
  color?: string;
  closable: boolean;
}>();

const emit = defineEmits<{
  action: [];
  close: [];
}>();
</script>

<template>
  <div
    class="ml-18 rounded-tl bg-accent p-1 h-10 flex items-center justify-center relative"
  >
    <div class="pr-18 flex flex-row items-center justify-center">
      {{ message }}
      <div
        v-show="buttonLabel"
        class="border border-text1 text-text1 px-1 py-1 text-sm rounded hover:bg-text1/20 ml-2 cursor-pointer"
        @click="emit('action')"
      >
        {{ buttonLabel }}
      </div>
    </div>
    <XIcon
      v-show="closable"
      class="text-text1 cursor-pointer hover:bg-text1/20 rounded w-fit h-fit absolute right-1"
      @click="emit('close')"
    />
  </div>
</template>
