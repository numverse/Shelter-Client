import { request } from "../base";

interface RemoveEmojiPackFromUserRequestData {
  emojiPackId: string;
}

function removeEmojiPackFromUser(data: RemoveEmojiPackFromUserRequestData) {
  return request<void>({
    method: "DELETE",
    url: `/api/users/@me/emoji-packs/${data.emojiPackId}`,
  });
}

export { removeEmojiPackFromUser };
