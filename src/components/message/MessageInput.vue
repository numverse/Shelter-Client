<script setup lang="ts">
import { computed, ref } from "vue";
import { createMessage } from "../../utils/api/messages/createMessage";

import { channelStore } from "../../stores/channel";
import { authStore } from "../../stores/auth";

const props = defineProps<{
  scrollToBottom?: () => void;
}>();

const text = ref("");
const editor = ref<HTMLDivElement | null>(null);

const placeholder = computed(() => {
  return channelStore.currentChannel.value
    ? `Message #${channelStore.currentChannel.value.name}`
    : "";
});

const currentChannel = computed(() => channelStore.currentChannel.value);

function onInput(e: Event) {
  text.value = (e.target as HTMLDivElement).innerText;
}

async function send() {
  if (!currentChannel.value?.id || !text.value.trim()) return;
  const messageContent = text.value.trim();
  const tempId = `temp-${Date.now()}`;
  text.value = "";
  if (editor.value) editor.value.innerText = "";
  channelStore.currentChannel.value?.messages.set(tempId, {
    id: tempId,
    channelId: currentChannel.value.id,
    authorId: authStore.currentUser.value?.id || "0",
    content: messageContent,
    createdAt: new Date().toISOString(),
    status: "SENDING",
  });
  if (props.scrollToBottom) {
    props.scrollToBottom();
  }
  const res = await createMessage({
    channelId: currentChannel.value.id,
    content: messageContent,
  });
  if (res.ok) {
    currentChannel.value?.messages.delete(tempId);
    currentChannel.value?.messages.set(res.id, res);
  } else {
    currentChannel.value?.messages.set(tempId, {
      ...currentChannel.value.messages.get(tempId)!,
      status: "FAILED",
    });
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
