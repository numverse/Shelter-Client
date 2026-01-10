import { reactive, ref } from "vue";
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
  shiftHeld: ref<boolean>(false),
  replyToMessageIdByChannel: reactive(new Map<string, string | null>()),
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
      stateStore.chatMode.value === "chat" ? `/channels/${channelStore.currentChannelID.value}` : `/channels/@me/${channelStore.currentDMID.value}`,
    );
  },
};

export { stateStore };
