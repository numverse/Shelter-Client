<script setup lang="ts">
import { onMounted, ref, onUnmounted, computed } from "vue";
import ChannelList from "../components/channel/ChannelList.vue";
import MessageList from "../components/message/MessageList.vue";
import MessageInput from "../components/message/MessageInput.vue";
import WidgetList from "../components/widget/WidgetList.vue";
import NotificationHeader from "../components/layout/NotificationHeader.vue";
import TitleHeader from "../components/layout/TitleHeader.vue";
import CurrentUser from "../components/layout/CurrentUser.vue";
import UserList from "../components/users/UserList.vue";

import { channelStore } from "../stores/channel";
import { userStore } from "../stores/users";
import { authStore } from "../stores/auth";
import { messageStore } from "../stores/message";
import { stateStore } from "../stores/state";

import { i18n } from "../utils/i18n/i18n";
import { resend } from "../utils/api/auth/resend";
import { refreshTokens } from "../utils/api/auth/refreshTokens";
import { BaseWebSocket } from "../utils/ws/base";

const messageListRef = ref<InstanceType<typeof MessageList> | null>(null);

let ws: BaseWebSocket;

const currentChannel = computed(() => {
  return channelStore.channelDataMap.get(channelStore.currentChannelID.value || "");
});

onMounted(async () => {
  await channelStore.fetchAll();
  await userStore.fetchAll();
  await userStore.fetchCurrentUser();
  channelStore.currentChannelID.value = channelStore.channelList.value[0] || null;

  if (((userStore.currentUser.value?.flags || 0) & 2) === 0) {
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

  let wsConnectedOnce = false;

  ws.on("open", () => {
    if (wsConnectedOnce) {
      stateStore.setNotificationHeader({
        text: i18n("notifications", "reconnected"),
        type: "success",
      }, 3000);
    }
    wsConnectedOnce = true;
    authStore.authed.value = true;
    if (channelStore.currentChannelID.value) {
      messageStore.fetchChannelMessages({
        channelId: channelStore.currentChannelID.value,
        limit: "50",
      });
    }
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
      await refreshTokens();
    }
    console.error("WebSocket closed:", evt.reason);

    if (authStore.authed.value) {
      setTimeout(() => {
        ws.reconnect();
      }, 2000);
    }
  });

  ws.on("MESSAGE_CREATE", async (message) => {
    const isCurrentChannel = message.channelId === channelStore.currentChannelID.value;
    const shouldStick = isCurrentChannel ? (messageListRef.value?.isAtBottom?.() ?? false) : false;
    const isMine = message.authorId === userStore.currentUser.value?.id;
    if (isMine) return;

    const channel = channelStore.channelDataMap.get(message.channelId);
    if (channel) {
      messageStore.messageDataMap.set(message.id, message);
      messageStore.messageListByChannel.get(message.channelId)?.push(message.id);
    }
    if (isCurrentChannel && shouldStick) {
      messageListRef.value?.scrollToBottom();
    }
  });

  ws.on("MESSAGE_DELETE", (data) => {
    const channel = channelStore.channelDataMap.get(data.channelId);
    if (channel) {
      messageStore.deleteMessage(data.messageId);
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
              # {{ currentChannel?.name ?? '' }}
            </div>
          </header>

          <MessageList ref="messageListRef" />
          <MessageInput
            :scroll-to-bottom="messageListRef?.scrollToBottom!"
          />
        </div>
        <UserList />
      </div>
    </div>
  </div>
</template>
