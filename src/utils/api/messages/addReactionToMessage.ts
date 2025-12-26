import { request } from "../base";

interface AddReactionToMessageRequestData {
  messageId: string;
  emojiId: string;
}

interface AddReactionToMessageResponse {
  success: boolean;
}

function addReactionToMessage(data: AddReactionToMessageRequestData) {
  return request<AddReactionToMessageResponse>({
    method: "PUT",
    url: `/api/messages/${data.messageId}/reactions/${data.emojiId}`,
  });
}

export { addReactionToMessage };
