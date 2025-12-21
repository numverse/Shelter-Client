import { request } from "../base";

function removeEmojiPackFromUser(emojiPackId: string) {
  return request({
    method: "DELETE",
    url: `/api/users/@me/emoji-packs/${emojiPackId}`,
  });
}

export { removeEmojiPackFromUser };
