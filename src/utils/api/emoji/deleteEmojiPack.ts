import { request } from "../base";

function deleteEmojiPack(emojiPackId: string) {
  return request<void>({
    method: "DELETE",
    url: `/api/emoji-packs/${emojiPackId}`,
  });
}

export { deleteEmojiPack };
