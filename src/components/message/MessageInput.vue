<script setup lang="ts">
import { computed, ref } from "vue";
import { createMessage } from "../../utils/api/messages/createMessage";

import { channelStore } from "../../stores/channel";
import { userStore } from "../../stores/users";
import { messageStore } from "../../stores/message";
import { stateStore } from "../../stores/state";

const props = defineProps<{
  scrollToBottom?: () => void;
}>();

const text = ref("");
const editor = ref<HTMLDivElement | null>(null);

const placeholder = computed(() => {
  return `Message #${currentChannel.value?.name || ""}`;
});

const currentChannel = computed(() => {
  return channelStore.channelDataMap.get(channelStore.currentChannelID?.value ?? "") || null;
});

const replyTo = computed(() => {
  return stateStore.replyToMessageIdByChannel.get(currentChannel.value?.id || "");
});
const replyToUser = computed(() => {
  const messageId = replyTo.value;
  if (!messageId) return null;
  const message = messageStore.messageDataMap.get(messageId);
  if (!message) return null;
  return userStore.userDataMap.get(message.authorId) || null;
});

function onInput(e: Event) {
  text.value = (e.target as HTMLDivElement).innerText;
}

async function send() {
  if (!currentChannel.value?.id || !text.value.trim()) return;
  const replyToId = replyTo.value;
  stateStore.replyToMessageIdByChannel.delete(currentChannel.value.id);
  const currentChannelMessageList = messageStore.messageListByChannel.get(currentChannel.value.id);
  const messageContent = text.value.trim();
  const tempId = `temp-${Date.now()}`;
  text.value = "";
  if (editor.value) editor.value.innerText = "";
  messageStore.messageDataMap.set(tempId, {
    id: tempId,
    channelId: currentChannel.value.id,
    authorId: userStore.currentUser.value?.id || "0",
    content: messageContent,
    replyTo: replyToId || undefined,
    createdAt: new Date().toISOString(),
    status: "SENDING",
  });
  currentChannelMessageList?.push(tempId);
  if (props.scrollToBottom) {
    props.scrollToBottom();
  }
  const res = await createMessage(currentChannel.value.id, {
    content: messageContent,
    replyTo: replyToId || undefined,
  });
  if (res.ok) {
    const list = messageStore.messageListByChannel.get(currentChannel.value.id);
    const index = list?.indexOf(tempId);
    if (index !== undefined && index !== -1 && list) {
      list[index] = res.id;
    }
    messageStore.messageDataMap.delete(tempId);
    messageStore.messageDataMap.set(res.id, res);
  } else {
    messageStore.messageDataMap.set(tempId, {
      ...messageStore.messageDataMap.get(tempId)!,
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
  <div
    v-if="replyTo"
    class="flex items-center mx-3 bg-bg3 rounded-t-lg px-3 py-2 text-lg relative border-t border-x border-bg4"
  >
    <div class="text-sm">
      Replying to {{ replyToUser?.displayName ?? replyToUser?.username }}
    </div>
  </div>
  <div
    class="flex items-center mx-3 mb-3 bg-bg3 px-3 py-2 text-lg relative border border-bg4"
    :class="replyTo ? 'rounded-b-lg' : 'rounded-lg'"
  >
    <span
      v-show="!text.trim()"
      class="absolute pointer-events-none text-text2 select-none"
    >
      {{ placeholder }}
    </span>
    <div
      ref="editor"
      contenteditable="true"
      class="flex-1 min-h-8 max-h-96 leading-6 overflow-y-auto py-3 whitespace-pre-wrap wrap-break-word outline-none"
      role="textbox"
      aria-multiline="true"
      @input="onInput"
      @keydown="onKey"
    />
  </div>
</template>
