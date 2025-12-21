import { Message, request } from "../base";

interface UpdateMessageRequestData {
  content: string;
}

function updateMessage(messageId: string, data: UpdateMessageRequestData) {
  return request<Message>({
    method: "PATCH",
    url: `/api/messages/${messageId}`,
    data: data,
  });
}

export { updateMessage };
