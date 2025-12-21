import { request } from "../base";

function removeEmojiPackFromUser(emojiPackId: string) {
  return request<void>({
    method: "DELETE",
    url: `/api/users/@me/emoji-packs/${emojiPackId}`,
  });
}

export { removeEmojiPackFromUser };
