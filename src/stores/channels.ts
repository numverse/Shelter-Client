import { getAllChannels } from "../utils/api/channels/getAllChannels";
import { ref, reactive } from "vue";
import { router } from "../router";
import { Channel, Message, User } from "../utils/api/types";
import { getMessages, GetMessagesRequestData } from "../utils/api/messages/getMessages";

interface ExtendedChannel extends Channel {
  messages: Map<string, Message>;
}

const channelsStore = {
  channels: reactive<Map<string, ExtendedChannel>>(new Map()),
  currentChannel: ref<Channel | null>(null),
  dms: reactive<Map<string, User>>(new Map()),
  currentDM: ref<User | null>(null),
  getChannel: function (id: string) {
    return channelsStore.channels.get(id) || null;
  },
  setCurrentChannel: function (id: string | null) {
    const channel = id ? channelsStore.channels.get(id) || null : null;
    channelsStore.currentChannel.value = channel;
    router.push(`/channels/${id}`);
  },
  getDM: function (id: string) {
    return channelsStore.dms.get(id) || null;
  },
  setCurrentDM: function (id: string | null) {
    const dm = id ? channelsStore.dms.get(id) || null : null;
    channelsStore.currentDM.value = dm || null;
    router.push(`/channels/@me/${id}`);
  },
  fetch: async function () {
    await channelsStore.fetchChannels();
    await channelsStore.fetchDMs();
  },
  fetchChannels: async function () {
    const allChannels = await getAllChannels();
    channelsStore.channels.clear();
    if (allChannels.ok) {
      for (const ch of allChannels.channels) {
        channelsStore.channels.set(ch.id, {
          ...ch,
          messages: new Map(),
        });
      }
    }
  },
  fetchDMs: async function () {
    // DMs not implemented yet
    channelsStore.dms.clear();
  },
  fetchChannelMessages: async function (data: GetMessagesRequestData) {
    const res = await getMessages(data);
    if (res.ok) {
      const channel = channelsStore.channels.get(data.channelId);
      if (channel) {
        for (const msg of res.messages) {
          channel.messages.set(msg.id, msg);
        }
      }
    }
  },
  fetchDMMessages: async function () {
    // DMs not implemented yet
  },
};

export { channelsStore };
