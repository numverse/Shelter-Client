import { request } from "../base";

interface DeleteMessageRequestData {
  messageId: string;
}

function deleteMessage(data: DeleteMessageRequestData) {
  return request<void>({
    method: "DELETE",
    url: `/api/messages/${data.messageId}`,
  });
}

export { deleteMessage };
