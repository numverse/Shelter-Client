import { request } from "../base";

interface DeleteMessageResponse {
  success: boolean;
}

function deleteMessage(messageId: string) {
  return request<DeleteMessageResponse>({
    method: "DELETE",
    url: `/api/messages/${messageId}`,
  });
}

export { deleteMessage };
