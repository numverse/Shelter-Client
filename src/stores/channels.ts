import { getAllChannels } from "../utils/api/channels/getAllChannels";
import { ref } from "vue";
import { Channel } from "../utils/api/types";

const channelStore = {
  channels: ref<Channel[]>([]),
  currentChannel: ref<Channel | null>(null),
  refresh: async function () {
    const allChannels = await getAllChannels();
    this.channels.value = allChannels.ok ? allChannels.channels : [];
  },
};

export { channelStore };
