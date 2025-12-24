<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getAllChannels } from "../utils/api/channels/getAllChannels";
import type { Channel } from "../utils/api/base";

const channels = ref<Channel[]>([]);
const loading = ref(true);

onMounted(async () => {
  const res = await getAllChannels();
  if (res.ok) channels.value = res.channels ?? []; // support array or wrapper
  loading.value = false;
});

const emit = defineEmits<{ (e: "select", ch: Channel): void }>();
function selectChannel(ch: Channel) {
  emit("select", ch);
}
</script>

<template>
  <aside class="w-64 bg-bg-secondary p-3 border-r border-bg-border h-full">
    <h3 class="text-sm font-semibold mb-2">
      Channels
    </h3>
    <div
      v-if="loading"
      class="text-sm text-text-secondary"
    >
      Loading...
    </div>
    <ul
      v-else
      class="space-y-1"
    >
      <li
        v-for="ch in channels"
        :key="ch.id"
      >
        <button
          class="w-full text-left px-2 py-1 rounded hover:bg-bg-hover"
          @click="selectChannel(ch)"
        >
          # {{ ch.name }}
        </button>
      </li>
    </ul>
  </aside>
</template>
