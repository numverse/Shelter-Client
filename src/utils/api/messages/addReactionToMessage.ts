import { request } from "../base";

interface AddReactionToMessageRequestData {
  channelId: string;
  messageId: string;
  emojiId: string;
}

interface AddReactionToMessageResponse {
  success: boolean;
}

function addReactionToMessage(data: AddReactionToMessageRequestData) {
  return request<AddReactionToMessageResponse>({
    method: "PUT",
    url: `/api/channels/${data.channelId}/messages/${data.messageId}/reactions/${data.emojiId}`,
  });
}

export { addReactionToMessage };
