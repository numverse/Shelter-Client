import { request } from "../base";

interface AddEmojiPackToUserResponse {
  success: boolean;
}

function addEmojiPackToUser(emojiPackId: string) {
  return request<AddEmojiPackToUserResponse>({
    method: "POST",
    url: `/api/users/@me/emoji-packs/${emojiPackId}`,
  });
}

export { addEmojiPackToUser };
