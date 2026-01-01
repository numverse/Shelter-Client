<script setup lang="ts">
import { channelStore } from "../../stores/channel";
import { computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps<{
  id: string;
}>();

const isSelected = computed(() =>
  channelStore.currentChannelID.value === props.id,
);

const channelName = computed(() => {
  const channel = channelStore.channelDataMap.get(props.id);
  return channel ? channel.name : "Unknown";
});

const selectChannel = () => {
  channelStore.currentChannelID.value = props.id;
  router.push(`/channels/${props.id}`);
};
</script>

<template>
  <div
    class="cursor-pointer px-2 py-1 rounded"
    :class="isSelected ? 'bg-bg3' : 'hover:bg-bg3/60'"
    @click="selectChannel"
  >
    # {{ channelName }}
  </div>
</template>
