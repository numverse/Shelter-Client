import { request } from "../base";

interface AddReactionToMessageRequestData {
  emoji: string;
}

function addReactionToMessage(messageId: string, emojiId: string) {
  return request({
    method: "PUT",
    url: `/api/messages/${messageId}/reactions/${emojiId}`,
  });
}

export { addReactionToMessage };
