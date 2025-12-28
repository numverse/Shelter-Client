import { ref } from "vue";
import { router } from "../router";
import { channelsStore } from "./channels";

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
  setNotificationHeader: function (header: NotificationHeader) {
    stateStore.notificationHeader.value = header;
  },
  closeNotificationHeader: function () {
    stateStore.notificationHeader.value.text = "";
  },
  toggleChatMode: function () {
    stateStore.chatMode.value = stateStore.chatMode.value === "chat" ? "dm" : "chat";
    router.push(
      stateStore.chatMode.value === "chat" ? `/channels${channelsStore.currentChannel.value ? `/${channelsStore.currentChannel.value?.id}` : ""}` : `/channels/@me${channelsStore.currentDM.value ? `/${channelsStore.currentDM.value}` : ""}`,
    );
  },
};

export { stateStore };
