import { request } from "../base";

function removeReactionFromMessage(messageId: string, emojiId: string) {
  return request<void>({
    method: "DELETE",
    url: `/api/messages/${messageId}/reactions/${emojiId}`,
  });
}

export { removeReactionFromMessage };
