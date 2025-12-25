import { getAllChannels } from "../utils/api/channels/getAllChannels";
import { ref } from "vue";
import { router } from "../router";
import { Channel } from "../utils/api/types";

const channelsStore = {
  mode: ref<"dm" | "chat">("chat"),
  channels: ref<Channel[]>([]),
  currentChannel: ref<Channel | null>(null),
  getChannel: function (id: string) {
    return channelsStore.channels.value.find((ch) => ch.id === id) ?? null;
  },
  setChannel: function (channel: Channel) {
    this.currentChannel.value = channel;
    router.push(`/channels/${channel.id}`);
  },
  refresh: async function () {
    const allChannels = await getAllChannels();
    this.channels.value = allChannels.ok ? allChannels.channels : [];
  },
};

export { channelsStore };
