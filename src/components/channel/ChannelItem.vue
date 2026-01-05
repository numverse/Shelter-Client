<script setup lang="ts">
import { channelStore } from "../../stores/channel";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { Hash, Volume2 } from "lucide-vue-next";
import { ChannelType } from "../../utils/api/types";

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
const channelType = computed(() => {
  const channel = channelStore.channelDataMap.get(props.id);
  return channel ? channel.type : ChannelType.GuildText;
});

const selectChannel = () => {
  channelStore.currentChannelID.value = props.id;
  router.push(`/channels/${props.id}`);
};
</script>

<template>
  <div
    v-if="channelType !== ChannelType.GuildCategory"
    class="cursor-pointer px-2 py-1 rounded flex"
    :class="isSelected ? 'bg-bg3' : 'hover:bg-bg3/60'"
    @click="selectChannel"
  >
    <div class="flex items-center mr-1">
      <Hash
        v-if="channelType === ChannelType.GuildText"
        class="w-5 h-5"
      />
      <Volume2
        v-if="channelType === ChannelType.GuildVoice"
        class="w-5 h-5"
      />
    </div>
    <div class="flex items-center">
      {{ channelName }}
    </div>
  </div>
  <div
    v-if="channelType === ChannelType.GuildCategory"
    class="pt-2"
  >
    {{ channelName }}
  </div>
</template>
