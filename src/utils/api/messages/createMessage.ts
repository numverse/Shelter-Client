import { request } from "../base";

interface CreateMessageRequestData {
  channelId: string;
  content: string;
  userId: string;
  replyTo: string;
}

function createMessage(data: CreateMessageRequestData) {
  return request({
    method: "POST",
    url: "/api/messages",
    data: data,
  });
}

export { createMessage };
