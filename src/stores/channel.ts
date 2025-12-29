import { getAllChannels } from "../utils/api/channels/getAllChannels";
import { ref, reactive } from "vue";
import { router } from "../router";
import { Channel, Message, User } from "../utils/api/types";
import { getMessages, GetMessagesRequestData } from "../utils/api/messages/getMessages";

interface ExtendedChannel extends Channel {
  messages: Map<string, Message>;
}

const channelStore = {
  channels: reactive<Map<string, ExtendedChannel>>(new Map()),
  currentChannel: ref<ExtendedChannel | null>(null),
  dms: reactive<Map<string, User>>(new Map()),
  currentDM: ref<User | null>(null),
  getChannel: function (id: string) {
    return channelStore.channels.get(id) || null;
  },
  setCurrentChannel: function (id: string | null) {
    const channel = id ? channelStore.channels.get(id) || null : null;
    channelStore.currentChannel.value = channel;
    router.push(`/channels/${id}`);
  },
  getDM: function (id: string) {
    return channelStore.dms.get(id) || null;
  },
  setCurrentDM: function (id: string | null) {
    const dm = id ? channelStore.dms.get(id) || null : null;
    channelStore.currentDM.value = dm || null;
    router.push(`/channels/@me/${id}`);
  },
  fetch: async function () {
    await channelStore.fetchChannels();
    await channelStore.fetchDMs();
  },
  fetchChannels: async function () {
    const allChannels = await getAllChannels();
    channelStore.channels.clear();
    if (allChannels.ok) {
      for (const ch of allChannels.channels) {
        channelStore.channels.set(ch.id, {
          ...ch,
          messages: new Map(),
        });
      }
    }
  },
  fetchDMs: async function () {
    // DMs not implemented yet
    channelStore.dms.clear();
  },
  fetchChannelMessages: async function (data: GetMessagesRequestData) {
    const res = await getMessages(data);
    if (res.ok) {
      const channel = channelStore.channels.get(data.channelId);
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
  deleteChannelMessage: function (channelId: string, messageId: string) {
    const channel = channelStore.channels.get(channelId);
    if (channel) {
      channel.messages.delete(messageId);
    }
  },
  deleteDMMessage: function () {
    // DMs not implemented yet
  },
};

export { channelStore };
