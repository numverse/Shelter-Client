import { request } from "../base";
import { Message } from "../types";

interface UpdateMessageRequestData {

  content: string;
}

function updateMessage(channelId: string, messageId: string, data: UpdateMessageRequestData) {
  return request<Message>({
    method: "PATCH",
    url: `/api/channels/${channelId}/messages/${messageId}`,
    data: data,
  });
}

export { updateMessage };
