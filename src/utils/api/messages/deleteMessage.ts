import { request } from "../base";

function deleteMessage(messageId: string) {
  return request<void>({
    method: "DELETE",
    url: `/api/messages/${messageId}`,
  });
}

export { deleteMessage };
