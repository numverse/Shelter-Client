<script setup lang="ts">
import { onMounted, ref, nextTick } from "vue";
import ChannelList from "../components/channel/ChannelList.vue";
import MessageList from "../components/message/MessageList.vue";
import MessageInput from "../components/message/MessageInput.vue";
import WidgetList from "../components/widget/WidgetList.vue";
import NotificationHeader from "../components/layout/NotificationHeader.vue";
import TitleHeader from "../components/layout/TitleHeader.vue";
import CurrentUser from "../components/layout/CurrentUser.vue";
import UserList from "../components/users/UserList.vue";

import { channelsStore } from "../stores/channels";
import { usersStore } from "../stores/users";
import { authStore } from "../stores/auth";
import { i18n } from "../utils/i18n/i18n";
import { resend } from "../utils/api/auth/resend";
import { ws } from "../stores/ws";

const notificationMessage = ref<string | null>(null);
const notificationButtonLabel = ref<string | undefined>(undefined);
const notificationAction = ref<(() => void) | undefined>(undefined);
const messageListRef = ref<InstanceType<typeof MessageList> | null>(null);

onMounted(async () => {
  await channelsStore.fetch();
  await usersStore.fetchAll();
  await authStore.fetchCurrentUser();
  channelsStore.setCurrentChannel(channelsStore.channels.keys().next().value || null);

  if (((authStore.currentUser.value?.flags || 0) & 2) === 0) {
    notificationMessage.value = i18n("notifications", "verify_email");
    notificationButtonLabel.value = i18n("notifications", "resend_verify_email");
    notificationAction.value = async function () {
      await resend();
      notificationButtonLabel.value = i18n("notifications", "verify_email_sent");
      notificationAction.value = undefined;
    };
  }
});

ws.on("MESSAGE_CREATE", async (message) => {
  const isCurrentChannel = message.channelId === channelsStore.currentChannel.value?.id;
  const shouldStick = isCurrentChannel ? (messageListRef.value?.isAtBottom?.() ?? false) : false;
  const isMine = message.authorId === authStore.currentUser.value?.id;

  const channel = channelsStore.channels.get(message.channelId);
  if (channel) {
    channel.messages.set(message.id, message);
  }
  if (isCurrentChannel && (isMine || shouldStick)) {
    await nextTick();
    messageListRef.value?.scrollToBottom();
  }
});

ws.on("MESSAGE_DELETE", (data) => {
  const channel = channelsStore.channels.get(data.channelId);
  if (channel) {
    channel.messages.delete(data.messageId);
  }
});
</script>

<template>
  <div class="flex flex-col h-screen">
    <TitleHeader />
    <NotificationHeader
      v-show="notificationMessage"
      :message="notificationMessage"
      :closable="true"
      :button-label="notificationButtonLabel"
      @close="notificationMessage = null;"
      @action="notificationAction"
    />
    <div class="flex-1 flex min-h-0">
      <WidgetList
        class="fixed left-0 top-7 h-screen"
      />
      <div class="ml-18 flex-1 flex min-h-0">
        <ChannelList />
        <CurrentUser />

        <div class="flex-1 flex flex-col bg-bg2 min-h-0">
          <header class="px-4 py-3 bg-bg2 flex items-center justify-between border-t border-b border-bg3">
            <div class="text-lg font-semibold">
              # {{ channelsStore.currentChannel.value?.name ?? '' }}
            </div>
          </header>

          <MessageList ref="messageListRef" />
          <MessageInput />
        </div>

        <aside class="w-64 bg-bg2 p-3 border-t border-l border-bg3">
          <UserList />
        </aside>
      </div>
    </div>
  </div>
</template>
