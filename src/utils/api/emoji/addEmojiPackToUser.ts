import { request } from "../base";

interface AddEmojiPackToUserResponse {
  success: boolean;
}

function addEmojiPackToUser(emojiPackId: string) {
  return request<AddEmojiPackToUserResponse>({
    method: "POST",
    url: `/api/emoji/${emojiPackId}/add`,
  });
}

export { addEmojiPackToUser };
