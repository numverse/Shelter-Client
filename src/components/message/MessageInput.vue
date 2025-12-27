<script setup lang="ts">
import { ref } from "vue";
import { createMessage } from "../../utils/api/messages/createMessage";
import { channelsStore } from "../../stores/channels";

const text = ref("");
const sending = ref(false);

async function send() {
  if (!channelsStore.currentChannel.value?.id || !text.value.trim()) return;
  sending.value = true;
  const res = await createMessage({
    channelId: channelsStore.currentChannel.value.id,
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
  <div class="p-3 border-t border-bg3 bg-bg2">
    <textarea
      v-model="text"
      :placeholder="channelsStore.currentChannel.value ? 'Message #' + channelsStore.currentChannel.value.name : 'Select a channel'"
      :disabled="!channelsStore.currentChannel.value"
      class="w-full p-2 rounded bg-bg-input text-text1 resize-none h-20"
      @keydown="onKey"
    />
    <div class="flex justify-end mt-2">
      <button
        :disabled="sending || !channelsStore.currentChannel.value || !text.trim()"
        class="px-4 py-2 bg-accent text-white rounded"
        @click="send"
      >
        Send
      </button>
    </div>
  </div>
</template>
