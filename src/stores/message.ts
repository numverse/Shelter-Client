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
    const res = await getMessages({
      ...data,
      messageId: data.messageId?.split("-")[1],
    });
    if (res.ok) {
      if (data.messageId) {
        const channel = messageStore.messageListByChannel.get(data.channelId) || [];
        if (channel.length > 0 && channel[0].startsWith("HAS_MORE_TOP")) {
          this.messageDataMap.delete(data.messageId);
          channel.shift();
        }
        messageStore.messageListByChannel.set(data.channelId, channel);
      }
      const channel = messageStore.messageListByChannel.get(data.channelId) || [];
      for (const msg of res.messages) {
        if (!messageStore.messageDataMap.has(msg.id)) {
          messageStore.messageDataMap.set(msg.id, msg);
          if (data.messageId) {
            channel.unshift(msg.id);
          } else {
            channel.push(msg.id);
          }
        }
      }
      if (res.hasMore) {
        if (!messageStore.messageDataMap.has(`HAS_MORE_TOP-${res.messages[0].id}`)) {
          messageStore.messageDataMap.set(`HAS_MORE_TOP-${res.messages[0].id}`, {} as Message);
          channel.unshift(`HAS_MORE_TOP-${res.messages[0].id}`);
        }
      }
      messageStore.messageListByChannel.set(data.channelId, channel);
    }
  },
  fetchDMMessages: async function () {
    // DMs not implemented yet
  },
};

export { messageStore };
