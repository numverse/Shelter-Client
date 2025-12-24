import { request } from "../base";
import { Message } from "../types";

interface CreateMessageRequestData {
  channelId: string;
  content: string;
  replyTo?: string;
  attachments?: File[];
}

function createMessage(data: CreateMessageRequestData) {
  const formData = new FormData();
  formData.append("channelId", data.channelId);
  formData.append("content", data.content);
  if (data.replyTo) {
    formData.append("replyTo", data.replyTo);
  }
  if (data.attachments) {
    data.attachments.forEach((attachment) => {
      formData.append("files", attachment);
    });
  }
  return request<Message>({
    method: "POST",
    url: "/api/messages",
    data: formData,
  });
}

export { createMessage };
