import { request } from "../base";

interface DeleteEmojiPackRequestData {
  emojiPackId: string;
}

function deleteEmojiPack(data: DeleteEmojiPackRequestData) {
  return request<void>({
    method: "DELETE",
    url: `/api/emoji-packs/${data.emojiPackId}`,
  });
}

export { deleteEmojiPack };
