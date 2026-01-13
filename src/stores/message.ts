import { shallowReactive, reactive } from "vue";
import { Message } from "../utils/api/types";
import { getMessages, GetMessagesRequestData } from "../utils/api/messages/getMessages";

function indexOf(arr: string[], target: string): number {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    const val = arr[mid].split("-").pop()!;
    if (val === target) {
      if (arr[mid].startsWith("load-more-before-")) {
        return mid + 1;
      }
      if (arr[mid].startsWith("load-more-after-")) {
        return mid - 1;
      }
      return mid;
    } else if (Number(val) > Number(target)) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}

const messageStore = {
  messageDataMap: shallowReactive(new Map<string, Message>()),
  messageListByChannel: reactive(new Map<string, Array<string>>()),
  deleteMessage: function (messageId: string) {
    this.messageDataMap.delete(messageId);
    for (const [_channelId, messageList] of this.messageListByChannel) {
      const index = indexOf(messageList, messageId);
      if (index !== -1) {
        messageList.splice(index, 1);
      }
    }
  },
  fetchChannelMessages: async function (data: GetMessagesRequestData) {
    if (!data.before && messageStore.messageListByChannel.has(data.channelId)) {
      return;
    }
    const res = await getMessages({
      ...data,
    });
    if (res.ok) {
      const channel = messageStore.messageListByChannel.get(data.channelId) || [];

      const messages = [];
      for (const msg of res.messages) {
        if (!messageStore.messageDataMap.has(msg.id)) {
          messageStore.messageDataMap.set(msg.id, msg);
          messages.push(msg.id);
        }
      }

      if (data.before) {
        if (res.messages.length >= 50 && messages.length > 0) {
          messages.unshift(`load-more-before-${messages[0]}`);
        }
        const index = indexOf(channel, data.before);
        if (index !== -1) {
          channel.splice(index, 1, ...messages);
        } else {
          channel.splice(0, 1, ...messages);
        }
      } else if (data.after) {
        if (res.messages.length >= 50 && messages.length > 0) {
          messages.push(`load-more-after-${messages[messages.length - 1]}`);
        }
        const index = indexOf(channel, data.after);
        if (index !== -1) {
          channel.splice(index + 1, 1, ...messages);
        } else {
          channel.splice(channel.length - 1, 1, ...messages);
        }
      } else {
        if (res.messages.length >= 50 && messages.length > 0) {
          messages.unshift(`load-more-before-${messages[0]}`);
        }
        channel.push(...messages);
      }

      messageStore.messageListByChannel.set(data.channelId, channel);
    }
  },
  fetchDMMessages: async function () {
    // DMs not implemented yet
  },
};

export { messageStore };
