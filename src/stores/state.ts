import { ref } from "vue";
import { router } from "../router";
import { channelsStore } from "./channels";

const stateStore = {
  chatMode: ref<"chat" | "dm">("chat"),
  locale: ref<string>("en-US"),
  toggleChatMode: function () {
    stateStore.chatMode.value = stateStore.chatMode.value === "chat" ? "dm" : "chat";
    router.push(
      stateStore.chatMode.value === "chat" ? `/channels${channelsStore.currentChannel.value ? `/${channelsStore.currentChannel.value?.id}` : ""}` : `/channels/@me${channelsStore.currentDM.value ? `/${channelsStore.currentDM.value}` : ""}`,
    );
  },
};

export { stateStore };
