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

const channel = computed(() => channelStore.channelDataMap.get(props.id));

const selectChannel = () => {
  channelStore.currentChannelID.value = props.id;
  router.push(`/channels/${props.id}`);
};
</script>

<template>
  <div
    v-if="channel?.type !== ChannelType.GuildCategory"
    class="cursor-pointer px-2 py-1 rounded flex"
    :class="isSelected ? 'bg-bg3' : 'hover:bg-bg3/60'"
    @click="selectChannel"
  >
    <div class="flex items-center mr-1">
      <Hash
        v-if="channel?.type === ChannelType.GuildText"
        class="w-5 h-5"
      />
      <Volume2
        v-if="channel?.type === ChannelType.GuildVoice"
        class="w-5 h-5"
      />
    </div>
    <div class="flex items-center">
      {{ channel?.name }}
    </div>
  </div>
  <div
    v-if="channel?.type === ChannelType.GuildCategory"
    class="pt-2"
  >
    {{ channel?.name }}
  </div>
</template>
