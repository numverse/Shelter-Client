import { getAllChannels } from "../utils/api/channels/getAllChannels";
import { ref } from "vue";
import { router } from "../router";
import { Channel } from "../utils/api/types";

const channelsStore = {
  channels: ref<Channel[]>([]),
  currentChannel: ref<Channel | null>(null),
  dms: ref<string[]>([]),
  currentDM: ref<string | null>(null),
  getChannel: function (id: string) {
    return channelsStore.channels.value.find((ch) => ch.id === id) ?? null;
  },
  setChannel: function (channel: Channel | null) {
    channelsStore.currentChannel.value = channel;
    if (channel) {
      router.push(`/channels/${channel.id}`);
    }
  },
  refresh: async function () {
    const allChannels = await getAllChannels();
    channelsStore.channels.value = allChannels.ok ? allChannels.channels : [];
  },
};

export { channelsStore };
