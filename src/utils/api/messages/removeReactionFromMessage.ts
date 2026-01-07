import { request } from "../base";

interface RemoveReactionFromMessageRequestData {
  channelId: string;
  messageId: string;
  emojiId: string;
}

function removeReactionFromMessage(data: RemoveReactionFromMessageRequestData) {
  return request<void>({
    method: "DELETE",
    url: `/api/channels/${data.channelId}/messages/${data.messageId}/reactions/${data.emojiId}`,
  });
}

export { removeReactionFromMessage };
