import { request } from "../base";

interface DeleteMessageRequestData {
  channelId: string;
  messageId: string;
}

function deleteMessage(data: DeleteMessageRequestData) {
  return request<void>({
    method: "DELETE",
    url: `/api/channels/${data.channelId}/messages/${data.messageId}`,
  });
}

export { deleteMessage };
