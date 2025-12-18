import { request } from "../base";

function removeReactionFromMessage(messageId: string, emoji: string) {
  return request({
    method: "DELETE",
    url: `/api/messages/${messageId}/reactions/${emoji}`,
  });
}

export { removeReactionFromMessage };
