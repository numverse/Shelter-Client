import { request } from "../base";
import { MessageInterface } from "../types";

interface UpdateMessageRequestData {

  content: string;
}

function updateMessage(channelId: string, messageId: string, data: UpdateMessageRequestData) {
  return request<MessageInterface>({
    method: "PATCH",
    url: `/api/channels/${channelId}/messages/${messageId}`,
    data: data,
  });
}

export { updateMessage };
