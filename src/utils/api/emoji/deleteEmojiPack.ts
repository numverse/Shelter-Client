import { request } from "../base";

interface DeleteEmojiPackResponse {
  success: boolean;
}

function deleteEmojiPack(emojiPackId: string) {
  return request<DeleteEmojiPackResponse>({
    method: "DELETE",
    url: `/api/emoji/${emojiPackId}`,
  });
}

export { deleteEmojiPack };
