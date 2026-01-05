import { getAllChannels } from "../utils/api/channels/getAllChannels";
import { ref } from "vue";
import { Channel, ChannelType, User } from "../utils/api/types";

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
      const channels: Channel[] = [];
      const childChannels: Record<string, Channel[]> = {};
      for (const ch of allChannels.channels) {
        if (ch.parentId
          && allChannels.channels.find((c) =>
            c.id === ch.parentId
            && c.type === ChannelType.GuildCategory)
        ) {
          if (childChannels[ch.parentId]) {
            childChannels[ch.parentId].push(ch);
          } else {
            childChannels[ch.parentId] = [ch];
          }
        } else {
          channels.push(ch);
        }
      }

      channels.sort((a, b) => {
        if (a.type === ChannelType.GuildCategory && b.type !== ChannelType.GuildCategory) {
          return 1;
        }
        if (a.type !== ChannelType.GuildCategory && b.type === ChannelType.GuildCategory) {
          return -1;
        }
        return a.position - b.position;
      });

      for (const catId in childChannels) {
        const categoryChannelIndex = channels.findIndex((c) => c.id === catId);
        if (categoryChannelIndex !== -1) {
          const children = childChannels[catId];
          children.sort((a, b) => a.position - b.position);
          channels.splice(categoryChannelIndex + 1, 0, ...children);
        }
      }

      for (const ch of channels) {
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
