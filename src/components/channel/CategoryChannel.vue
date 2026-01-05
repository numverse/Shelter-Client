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
  <div class="cursor-pointer flex pt-2 ">
    <div class="flex items-center mr-1">
      {{ channel?.name }}
    </div>
    <div class="flex items-center">
      <ChevronDown class="w-4 h-4" />
    </div>
  </div>
</template>
