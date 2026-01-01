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
    const res = await getMessages(data);
    if (res.ok) {
      const channel = messageStore.messageListByChannel.get(data.channelId) || [];
      for (const msg of res.messages) {
        messageStore.messageDataMap.set(msg.id, msg);
        if (!channel.includes(msg.id)) {
          channel.push(msg.id);
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
