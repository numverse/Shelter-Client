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
  channelsStore.setCurrentChannel(props.id);
  router.push(`/channels/${props.id}`);
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
