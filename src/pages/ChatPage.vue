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
import { usersStore } from "../stores/users";
import { authStore } from "../stores/auth";

onMounted(async () => {
  await channelsStore.fetch();
  await usersStore.fetchAll();
  await authStore.fetchCurrentUser();
  channelsStore.setCurrentChannel(channelsStore.channels.keys().next().value || null);
});
</script>

<template>
  <div class="flex flex-col h-screen">
    <TitleHeader />
    <!-- <NotificationHeader /> -->
    <div class="flex-1 flex">
      <WidgetList />
      <ChannelList />
      <CurrentUser
        :username="authStore.currentUser.value?.username"
        :avatar-id="authStore.currentUser.value?.avatarId"
      />

      <div class="flex-1 flex flex-col">
        <header class="px-4 py-3 bg-bg2 flex items-center justify-between border-t border-b border-bg3">
          <div class="text-lg font-semibold">
            # {{ channelsStore.currentChannel.value?.name ?? '' }}
          </div>
        </header>

        <MessageList
          :channel-id="channelsStore.currentChannel.value?.id ?? null"
          class="flex-1"
        />

        <MessageInput :channel-id="channelsStore.currentChannel.value?.id ?? null" />
      </div>

      <aside class="w-64 bg-bg2 p-3 border-t border-l border-bg3">
        <h4 class="text-sm font-semibold">
          Members
        </h4>
        <div class="text-sm text-text2 mt-2">
          (Not implemented)
        </div>
      </aside>
    </div>
  </div>
</template>
