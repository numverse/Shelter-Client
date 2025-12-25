<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, nextTick } from "vue";
import type { Message } from "../utils/api/types";
import { getMessages } from "../utils/api/messages/getMessages";
// import { client } from "../utils/store/auth";

const props = defineProps<{ channelId: string | null }>();

const messages = ref<Message[]>([]);
const loading = ref(false);
const containerRef = ref<HTMLElement | null>(null);

async function load(channelId: string) {
  loading.value = true;
  const res = await getMessages(channelId, "50", "");
  if (res.ok) {
    messages.value = Array.isArray(res.messages) ? res.messages : [];
    messages.value.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    await nextTick();
    if (containerRef.value) containerRef.value.scrollTop = containerRef.value.scrollHeight;
  } else {
    messages.value = [];
  }
  loading.value = false;
}

let wsListener: ((m: Message) => void) | null = null;

watch(() => props.channelId, (cid) => {
  messages.value = [];
  if (cid) load(cid);
});

// onMounted(() => {
//   wsListener = (m: Message) => {
//     if (m.channelId === props.channelId) {
//       messages.value.push(m);
//     }
//   };
//   client.on("MESSAGE_CREATE", wsListener);
// });

// onUnmounted(() => {
//   if (wsListener) client.off("MESSAGE_CREATE", wsListener);
// });
</script>

<template>
  <div
    ref="containerRef"
    class="flex-1 p-4 overflow-auto h-full bg-bg2"
  >
    <div
      v-if="loading"
      class="text-sm text-text2"
    >
      Loading messages...
    </div>
    <div v-else>
      <ul
        v-if="messages.length"
        class="space-y-3"
      >
        <li
          v-for="m in messages"
          :key="m.id"
          class="p-2 rounded hover:bg-bg-hover"
        >
          <div class="text-sm text-text2">
            {{ m.authorId }} • {{ new Date(m.createdAt).toLocaleString() }}
          </div>
          <div class="mt-1 text-text1">
            {{ m.content }}
          </div>
        </li>
      </ul>
      <div
        v-else
        class="text-sm text-text2"
      >
        No messages yet.
      </div>
    </div>
  </div>
</template>
