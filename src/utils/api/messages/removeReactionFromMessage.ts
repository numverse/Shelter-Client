import { request } from "../base";

function removeReactionFromMessage(messageId: string, emojiId: string) {
  return request({
    method: "DELETE",
    url: `/api/messages/${messageId}/reactions/${emojiId}`,
  });
}

export { removeReactionFromMessage };
