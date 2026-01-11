import { reactive } from "vue";
import { Message } from "../utils/api/types";
import { getMessages, GetMessagesRequestData } from "../utils/api/messages/getMessages";

const messageStore = {
  messageDataMap: new Map<string, Message>(),
  messageListByChannel: reactive(new Map<string, Array<string>>()),
  deleteMessage: function (messageId: string) {
    this.messageDataMap.delete(messageId);
    for (const [_channelId, messageList] of this.messageListByChannel) {
      const index = messageList.indexOf(messageId);
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
        if (res.messages.length >= 50) {
          messages.unshift(`load-more-before-${messages[0]}`);
        }
        const index = channel.indexOf(data.before);
        if (index !== -1) {
          channel.splice(index - 1, 1, ...messages);
        } else {
          channel.splice(0, 1, ...messages);
        }
      } else if (data.after) {
        if (res.messages.length >= 50) {
          messages.push(`load-more-after-${messages[messages.length - 1]}`);
        }
        const index = channel.indexOf(data.after);
        if (index !== -1) {
          channel.splice(index + 1, 1, ...messages);
        } else {
          channel.splice(channel.length - 1, 1, ...messages);
        }
      } else {
        if (res.messages.length >= 50) {
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
