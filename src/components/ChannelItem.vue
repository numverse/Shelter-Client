<script setup lang="ts">
import { channelsStore } from "../stores/channels";
import { computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps<{
  id: string;
  name: string;
}>();

const isSelected = computed(() =>
  channelsStore.currentChannel.value?.id === props.id,
);

const selectChannel = () => {
  const channel = channelsStore.getChannel(props.id);
  if (channel) {
    channelsStore.setChannel(channel);
    router.push(`/channels/${channel.id}`);
  }
};
</script>

<template>
  <div
    class="w-full cursor-pointer px-2 py-1 rounded"
    :class="isSelected ? 'bg-bg3' : 'hover:bg-bg3/60'"
    @click="selectChannel"
  >
    # {{ name }}
  </div>
</template>
