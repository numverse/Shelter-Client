<script setup lang="ts">
import { computed, ref } from "vue";
import { createMessage } from "../../utils/api/messages/createMessage";
import { channelsStore } from "../../stores/channels";

const text = ref("");
const sending = ref(false);
const editor = ref<HTMLDivElement | null>(null);

const placeholder = computed(() => {
  return channelsStore.currentChannel.value
    ? `Message #${channelsStore.currentChannel.value.name}`
    : "";
});

const currentChannelId = computed(() => channelsStore.currentChannel.value?.id);

function onInput(e: Event) {
  text.value = (e.target as HTMLDivElement).innerText;
}

async function send() {
  if (!currentChannelId.value || !text.value.trim()) return;
  sending.value = true;
  try {
    const res = await createMessage({
      channelId: currentChannelId.value,
      content: text.value.trim(),
    });
    if (res.ok) {
      text.value = "";
      if (editor.value) editor.value.innerText = "";
    }
  } catch (err) {
    console.error("Failed to send message", err);
  } finally {
    sending.value = false;
  }
}

function onKey(e: KeyboardEvent) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    send();
  }
}
</script>

<template>
  <div class="flex items-center mx-3 mb-3 bg-bg3 rounded px-3 py-2 text-lg relative">
    <span
      v-show="!text.trim()"
      class="absolute pointer-events-none text-text2 select-none"
    >
      {{ placeholder }}
    </span>
    <div
      ref="editor"
      contenteditable="true"
      class="flex-1 min-h-10 max-h-96 leading-6 overflow-y-auto py-3.5 whitespace-pre-wrap wrap-break-word outline-none"
      role="textbox"
      aria-multiline="true"
      @input="onInput"
      @keydown="onKey"
    />
  </div>
</template>
