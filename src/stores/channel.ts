import { getAllChannels } from "../utils/api/channels/getAllChannels";
import { ref } from "vue";
import { Channel, User } from "../utils/api/types";

const channelStore = {
  channelDataMap: new Map<string, Channel>(),
  channelList: ref<Array<string>>([]),
  currentChannelID: ref<string | null>(null),
  dmDataMap: new Map<string, User>(),
  dmList: ref<Array<string>>([]),
  currentDMID: ref<string | null>(null),
  fetchAll: async function () {
    await channelStore.fetchChannels();
    await channelStore.fetchDMs();
  },
  fetchChannels: async function () {
    const allChannels = await getAllChannels();
    channelStore.channelDataMap.clear();
    channelStore.channelList.value = [];
    if (allChannels.ok) {
      allChannels.channels.sort((a, b) => a.position - b.position);
      for (const ch of allChannels.channels) {
        channelStore.channelDataMap.set(ch.id, ch);
        channelStore.channelList.value.push(ch.id);
      }
    }
  },
  fetchDMs: async function () {
    // DMs not implemented yet
    channelStore.dmDataMap.clear();
  },
};

export { channelStore };
