import { request } from "../base";

interface AddReactionToMessageResponse {
  success: boolean;
}

function addReactionToMessage(messageId: string, emojiId: string) {
  return request<AddReactionToMessageResponse>({
    method: "PUT",
    url: `/api/messages/${messageId}/reactions/${emojiId}`,
  });
}

export { addReactionToMessage };
