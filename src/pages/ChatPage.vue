<script setup lang="ts">
import { onMounted } from "vue";
import ChannelList from "../components/channel/ChannelList.vue";
import MessageList from "../components/message/MessageList.vue";
import MessageInput from "../components/message/MessageInput.vue";
import WidgetList from "../components/widget/WidgetList.vue";
import NotificationHeader from "../components/layout/NotificationHeader.vue";
import TitleHeader from "../components/layout/TitleHeader.vue";
import CurrentUser from "../components/layout/CurrentUser.vue";

import { channelsStore } from "../stores/channels";

onMounted(async () => {
  await channelsStore.refresh();
  channelsStore.setCurrentChannel(channelsStore.channels.keys().next().value || null);
});
</script>

<template>
  <div class="flex flex-col h-screen grid-container">
    <TitleHeader class="titleBar" />
    <NotificationHeader class="noticeBar" />
    <div class="flex-1 flex content">
      <WidgetList class="widgetList" />
      <ChannelList class="channelsList" />

      <div class="page flex-1 flex">
        <div class="flex-1 flex flex-col">
          <header class="px-4 py-3 border-b border-bg3 bg-bg2 flex items-center justify-between">
            <div class="text-lg font-semibold">
              # {{ channelsStore.currentChannel.value?.name ?? 'No channel selected' }}
            </div>
          </header>

          <MessageList
            :channel-id="channelsStore.currentChannel.value?.id ?? null"
            class="flex-1"
          />

          <MessageInput :channel-id="channelsStore.currentChannel.value?.id ?? null" />
        </div>

        <aside class="w-64 bg-bg2 p-3 border-l border-bg3">
          <h4 class="text-sm font-semibold">
            Members
          </h4>
          <div class="text-sm text-text2 mt-2">
            (Not implemented)
          </div>
        </aside>
      </div>
    </div>
    <CurrentUser />
  </div>
</template>

<style scoped>
.grid-container  {
  --custom-app-top-bar-height: 28px;
    display: grid;
    grid-template-areas:
      "titleBar titleBar titleBar"
      "widgetList noticeBar noticeBar"
      "widgetList channelsList page";
    grid-template-columns: [start] -webkit-min-content [guildsEnd] -webkit-min-content [channelsEnd] 1fr [end];
    grid-template-columns: [start] min-content [guildsEnd] min-content [channelsEnd] 1fr [end];
    grid-template-rows: [top] var(--custom-app-top-bar-height) [titleBarEnd] -webkit-min-content [noticeBarEnd] 1fr [end];
    grid-template-rows: [top] var(--custom-app-top-bar-height) [titleBarEnd] min-content [noticeBarEnd] 1fr [end];
}

.content {
    display: grid;
    grid-column: start/end;
    grid-row: titleBarEnd/end;
    grid-template-columns: subgrid;
    grid-template-rows: subgrid;
}

.titleBar {
  grid-area: titleBar;
}

.noticeBar {
  grid-area: noticeBar;
}

.widgetList {
  grid-area: widgetList;
}

.channelsList {
  grid-area: channelsList;
}

.page {
  grid-area: page;
}
</style>
