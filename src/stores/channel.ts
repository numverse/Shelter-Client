import { getAllChannels } from "../utils/api/channels/getAllChannels";
import { ref } from "vue";

import { ChannelInterface, ChannelType } from "../structures/interfaces/ChannelInterface";

export const channelDataMap = new Map<string, ChannelInterface>();

export const channelList = ref<Array<string>>([]);
export const dmList = ref<Array<string>>([]);

export const currentChannelID = ref<string | null>(null);
export const currentDMID = ref<string | null>(null);

export async function fetchAllChannels() {
  const allChannels = await getAllChannels();
  channelDataMap.clear();
  channelList.value = [];
  if (allChannels.ok) {
    const channels: ChannelInterface[] = [];
    const childChannels: Record<string, ChannelInterface[]> = {};
    for (const ch of allChannels.channels) {
      channelDataMap.set(ch.id, ch);
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

    for (const ch of channels) {
      if (ch.type === ChannelType.GuildCategory) {
        channelList.value.push(ch.id);
        if (childChannels[ch.id]) {
          childChannels[ch.id].sort((a, b) => a.position - b.position);
          for (const childCh of childChannels[ch.id]) {
            channelList.value.push(childCh.id);
          }
        }
        continue;
      }

      channelList.value.push(ch.id);
    }
  }
}
