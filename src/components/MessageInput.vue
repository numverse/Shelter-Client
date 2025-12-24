<script setup lang="ts">
import { ref } from "vue";
import { createMessage } from "../utils/api/messages/createMessage";

const props = defineProps<{ channelId: string | null }>();

const text = ref("");
const sending = ref(false);

async function send() {
  if (!props.channelId || !text.value.trim()) return;
  sending.value = true;
  const res = await createMessage({
    channelId: props.channelId,
    content: text.value.trim(),
  });
  if (res.ok) {
    text.value = "";
  }
  sending.value = false;
}

function onKey(e: KeyboardEvent) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    send();
  }
}
</script>

<template>
  <div class="p-3 border-t border-bg-tertiary bg-bg-secondary">
    <textarea
      v-model="text"
      :placeholder="props.channelId ? 'Message #' + props.channelId : 'Select a channel'"
      :disabled="!props.channelId"
      class="w-full p-2 rounded bg-bg-input text-text-primary resize-none h-20"
      @keydown="onKey"
    />
    <div class="flex justify-end mt-2">
      <button
        :disabled="sending || !props.channelId || !text.trim()"
        class="px-4 py-2 bg-accent text-white rounded"
        @click="send"
      >
        Send
      </button>
    </div>
  </div>
</template>
