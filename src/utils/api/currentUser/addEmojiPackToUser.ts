import { request } from "../base";

interface AddEmojiPackToUserRequestData {
  emojiPackId: string;
}

interface AddEmojiPackToUserResponse {
  success: boolean;
}

function addEmojiPackToUser(data: AddEmojiPackToUserRequestData) {
  return request<AddEmojiPackToUserResponse>({
    method: "POST",
    url: `/api/users/@me/emoji-packs/${data.emojiPackId}`,
  });
}

export { addEmojiPackToUser };
