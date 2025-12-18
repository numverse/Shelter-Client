import { request } from "../base";

interface RemoveEmojiPackFromUserResponse {
  success: boolean;
}

function removeEmojiPackFromUser(emojiPackId: string) {
  return request<RemoveEmojiPackFromUserResponse>({
    method: "DELETE",
    url: `/api/emoji/${emojiPackId}/add`,
  });
}

export { removeEmojiPackFromUser };
