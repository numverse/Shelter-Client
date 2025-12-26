import { request } from "../base";

interface RemoveReactionFromMessageRequestData {
  messageId: string;
  emojiId: string;
}

function removeReactionFromMessage(data: RemoveReactionFromMessageRequestData) {
  return request<void>({
    method: "DELETE",
    url: `/api/messages/${data.messageId}/reactions/${data.emojiId}`,
  });
}

export { removeReactionFromMessage };
