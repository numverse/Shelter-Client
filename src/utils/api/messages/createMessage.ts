import { request } from "../base";
import { MessageInterface } from "../../../structures/interfaces/MessageInterface";

interface CreateMessageRequestData {
  content: string;
  replyTo?: string;
  attachments?: File[];
}

function createMessage(channelId: string, data: CreateMessageRequestData) {
  return request<MessageInterface>({
    method: "POST",
    url: `/api/channels/${channelId}/messages`,
    data: data,
  });
}

export { createMessage };
