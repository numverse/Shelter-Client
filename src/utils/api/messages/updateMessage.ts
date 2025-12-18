import { request } from "../base";

interface UpdateMessageRequestData {
  content: string;
}

function updateMessage(messageId: string, data: UpdateMessageRequestData) {
  return request({
    method: "PATCH",
    url: `/api/messages/${messageId}`,
    data: data,
  });
}

export { updateMessage };
