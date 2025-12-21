import { request } from "../base";

function deleteEmojiPack(emojiPackId: string) {
  return request({
    method: "DELETE",
    url: `/api/emoji-packs/${emojiPackId}`,
  });
}

export { deleteEmojiPack };
