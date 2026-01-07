import { request } from "../base";
import { Message } from "../types";

interface CreateMessageRequestData {
  content: string;
  replyTo?: string;
  attachments?: File[];
}

function createMessage(channelId: string, data: CreateMessageRequestData) {
  return request<Message>({
    method: "POST",
    url: `/api/channels/${channelId}/messages`,
    data: data,
  });
}

export { createMessage };
