<script setup lang="ts">
import { channelStore } from "../../stores/channel";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { Hash } from "lucide-vue-next";

const router = useRouter();

const props = defineProps<{
  id: string;
}>();

const isSelected = computed(() =>
  channelStore.currentChannelID.value === props.id,
);

const channel = computed(() => channelStore.channelDataMap.get(props.id));

const selectChannel = () => {
  channelStore.currentChannelID.value = props.id;
  router.push(`/channels/${props.id}`);
};
</script>

<template>
  <div
    class="cursor-pointer px-2 py-1 rounded flex"
    :class="isSelected ? 'bg-bg3' : 'hover:bg-bg3/60'"
    @click="selectChannel"
  >
    <div class="flex items-center mr-1">
      <Hash class="w-5 h-5" />
    </div>
    <div class="flex items-center">
      {{ channel?.name }}
    </div>
  </div>
</template>
