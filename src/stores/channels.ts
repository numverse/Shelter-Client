import { getAllChannels } from "../utils/api/channels/getAllChannels";
import { ref, reactive } from "vue";
import { router } from "../router";
import { Channel, Message } from "../utils/api/types";

interface ExtendedChannel extends Channel {
  messages: Message[];
}

interface PlaceholderDM {
  id: string;
}

const channelsStore = {
  channels: reactive<Map<string, ExtendedChannel>>(new Map()),
  currentChannel: ref<Channel | null>(null),
  dms: reactive<Map<string, PlaceholderDM>>(new Map()),
  currentDM: ref<string | null>(null),
  getChannel: function (id: string) {
    return channelsStore.channels.get(id) || null;
  },
  setCurrentChannel: function (channelId: string | null) {
    const channel = channelId ? channelsStore.channels.get(channelId) || null : null;
    channelsStore.currentChannel.value = channel;
    if (channel) {
      router.push(`/channels/${channel.id}`);
    }
  },
  refresh: async function () {
    await channelsStore.refreshChannels();
    await channelsStore.refreshDMs();
  },
  refreshChannels: async function () {
    const allChannels = await getAllChannels();
    channelsStore.channels.clear();
    if (allChannels.ok) {
      for (const ch of allChannels.channels) {
        channelsStore.channels.set(ch.id, {
          ...ch,
          messages: [],
        });
      }
    }
  },
  refreshDMs: async function () {
    // DMs not implemented yet
    channelsStore.dms.clear();
  },
};

export { channelsStore };
