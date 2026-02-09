<script setup lang="ts">
import { onMounted, ref, onUnmounted } from "vue";
import ChannelList from "../components/channel/ChannelList.vue";
import MessageList from "../components/message/MessageList.vue";
import MessageInput from "../components/message/MessageInput.vue";
import WidgetList from "../components/widget/WidgetList.vue";
import NotificationHeader from "../components/layout/NotificationHeader.vue";
import TitleHeader from "../components/layout/TitleHeader.vue";
import CurrentUser from "../components/layout/CurrentUser.vue";
import UserList from "../components/users/UserList.vue";

import { Message } from "../structures/Message";

import { channelList, currentChannelID, channelDataMap, fetchAllChannels } from "../stores/channel";
import { authStore } from "../stores/auth";
import { messageStore } from "../stores/message";
import { stateStore } from "../stores/state";

import { fetchCurrentUser, fetchAllUsers, currentUser, userDataMap } from "../stores/users";

import { i18n } from "../utils/i18n/i18n";
import { resend } from "../utils/api/auth/resend";
import { BaseWebSocket } from "../utils/ws/base";

import { useRouter } from "vue-router";
const router = useRouter();

const messageListRef = ref<InstanceType<typeof MessageList> | null>(null);

let ws: BaseWebSocket;

onMounted(async () => {
  await fetchAllChannels();
  await fetchAllUsers();
  await fetchCurrentUser();

  const channelId = router.currentRoute.value.params.channelId as string | undefined;
  if (channelId && channelList.value.includes(channelId)) {
    currentChannelID.value = channelId;
  } else {
    currentChannelID.value = channelList.value[0] || null;
    router.replace(`/channels/${currentChannelID.value}`);
  }

  if (((currentUser.value?.flags || 0) & 2) === 0) {
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
    // todo 어디까지 읽었음 표시하기 (새로운 메시지가 있으면)
    if (currentChannelID.value) {
      messageStore.fetchChannelMessages({
        channelId: currentChannelID.value,
        limit: 50,
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
      await authStore.refreshTokens();
    }
    console.error("WebSocket closed:", evt.reason);

    if (authStore.authed.value) {
      setTimeout(() => {
        ws.reconnect();
      }, 2000);
    } else {
      return router.replace("/login");
    }
  });

  ws.on("MESSAGE_CREATE", async (message) => {
    const isCurrentChannel = message.channelId === currentChannelID.value;
    const shouldStick = isCurrentChannel ? (messageListRef.value?.isAtBottom?.() ?? false) : false;
    const isMine = message.authorId === currentUser.value?.id;
    if (isMine) return;

    const channel = channelDataMap.get(message.channelId);
    if (channel) {
      messageStore.messageDataMap.set(message.id, new Message(message));
      messageStore.messageListByChannel.get(message.channelId)?.push(message.id);
    }
    if (isCurrentChannel && shouldStick) {
      messageListRef.value?.scrollToBottom();
    }
  });

  ws.on("MESSAGE_DELETE", (data) => {
    const channel = channelDataMap.get(data.channelId);
    if (channel) {
      messageStore.deleteMessage(data.messageId);
    }
  });

  ws.on("PRESENCE_UPDATE", (data) => {
    const user = userDataMap.get(data.userId);
    if (user) {
      user.presence = {
        status: data.status,
      };
      userDataMap.set(data.userId, user);
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
        <div class="flex-1 flex flex-col bg-bg2 min-h-0 border-l border-r border-bg3">
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
