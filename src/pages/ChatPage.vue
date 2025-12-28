<script setup lang="ts">
import { onMounted, ref, nextTick, onUnmounted } from "vue";
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
import { stateStore } from "../stores/state";

import { i18n } from "../utils/i18n/i18n";
import { resend } from "../utils/api/auth/resend";
import { refreshTokens } from "../utils/api/auth/refreshTokens";
import { BaseWebSocket } from "../utils/ws/base";

const messageListRef = ref<InstanceType<typeof MessageList> | null>(null);

let ws: BaseWebSocket;

onMounted(async () => {
  await channelsStore.fetch();
  await usersStore.fetchAll();
  await authStore.fetchCurrentUser();
  channelsStore.setCurrentChannel(channelsStore.channels.keys().next().value || null);

  if (((authStore.currentUser.value?.flags || 0) & 2) === 0) {
    stateStore.setNotificationHeader({
      text: i18n("notifications", "verify_email"),
      type: "info",
      actionButtonLabel: i18n("notifications", "resend_verify_email"),
      action: async () => {
        await resend();
        stateStore.setNotificationHeader({
          text: i18n("notifications", "verify_email_sent"),
          type: "info",
        });
      },
    });
  }

  ws = new BaseWebSocket("wss://shelter.zero624.dev/gateway");

  ws.on("open", () => {
    authStore.authed = true;
  });

  ws.on("error", (evt) => {
    console.error("WebSocket error:", evt);
  });

  ws.on("close", async (evt) => {
    stateStore.setNotificationHeader({
      text: i18n("notifications", "disconnected"),
      type: "error",
    });
    if (evt.reason === "AUTHENTICATION_REQUIRED") {
      const res = await refreshTokens().catch(() => ({
        ok: false,
      }));
      authStore.authed = res.ok;
    }
    console.error("WebSocket closed:", evt.reason);

    if (authStore.authed) {
      setTimeout(() => {
        ws.reconnect();
      }, 5000);
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
});

onUnmounted(() => {
  if (ws) {
    ws.close();
  }
});
</script>

<template>
  <div class="flex flex-col h-screen">
    <TitleHeader />
    <NotificationHeader />
    <div class="flex-1 flex min-h-0">
      <WidgetList />
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
        <UserList />
      </div>
    </div>
  </div>
</template>
