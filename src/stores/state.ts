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
  setChatMode: function (mode: "chat" | "dm") {
    stateStore.chatMode.value = mode;
    if (mode === "chat") {
      router.push(`/channels/${channelStore.currentChannelID.value}`);
    } else {
      if (channelStore.currentDMID.value) {
        router.push(`/channels/@me/${channelStore.currentDMID.value}`);
      } else {
        router.push("/channels/@me");
      }
    }
  },
};

export { stateStore };
