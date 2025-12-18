import { request } from "../base";

function updateEmojiPack(emojiPackId: string) {
  return request({
    method: "PUT",
    url: `/api/emoji/${emojiPackId}`,
  });
}

export { updateEmojiPack };
