import { request } from "../base";

interface AddReactionToMessageRequestData {
  emoji: string;
}

function addReactionToMessage(messageId: string, data: AddReactionToMessageRequestData) {
  return request({
    method: "POST",
    url: `/api/messages/${messageId}/reactions`,
    data: data,
  });
}

export { addReactionToMessage };
