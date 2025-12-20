import { request } from "../base";

function addReactionToMessage(messageId: string, emojiId: string) {
  return request({
    method: "PUT",
    url: `/api/messages/${messageId}/reactions/${emojiId}`,
  });
}

export { addReactionToMessage };
