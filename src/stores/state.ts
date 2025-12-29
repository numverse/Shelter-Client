import { ref } from "vue";
import { router } from "../router";
import { channelStore } from "./channel";

interface NotificationHeader {
  text: string;
  type: "info" | "error" | "success" | "warning";
  closable?: boolean;
  actionButtonLabel?: string;
  action?: (() => void);
}

const stateStore = {
  chatMode: ref<"chat" | "dm">("chat"),
  locale: ref<string>("en-US"),
  notificationHeader: ref<NotificationHeader>({
    text: "",
    type: "info",
  }),
  setNotificationHeader: function (header: NotificationHeader, duration?: number) {
    stateStore.notificationHeader.value = header;
    if (duration) {
      setTimeout(() => {
        stateStore.closeNotificationHeader();
      }, duration);
    }
  },
  closeNotificationHeader: function () {
    stateStore.notificationHeader.value.text = "";
  },
  toggleChatMode: function () {
    stateStore.chatMode.value = stateStore.chatMode.value === "chat" ? "dm" : "chat";
    router.push(
      stateStore.chatMode.value === "chat" ? `/channels${channelStore.currentChannel.value ? `/${channelStore.currentChannel.value?.id}` : ""}` : `/channels/@me${channelStore.currentDM.value ? `/${channelStore.currentDM.value}` : ""}`,
    );
  },
};

export { stateStore };
