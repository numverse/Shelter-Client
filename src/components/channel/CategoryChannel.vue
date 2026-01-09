<script setup lang="ts">
import { channelStore } from "../../stores/channel";
import { computed } from "vue";
import { ChevronDown } from "lucide-vue-next";

const props = defineProps<{
  id: string;
}>();

const channel = computed(() => channelStore.channelDataMap.get(props.id));
</script>

<template>
  <div class="cursor-pointer flex pt-2 group">
    <div class="flex items-center mr-1 text-[#808080] group-hover:text-white transition-colors">
      {{ channel?.name }}
    </div>
    <div class="flex items-center">
      <ChevronDown
        class="w-3 h-3 text-[#808080] group-hover:text-white transition-colors"
        :stroke-width="2.5"
      />
    </div>
  </div>
</template>
