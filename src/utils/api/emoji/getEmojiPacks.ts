import { request, EmojiPack } from "../base";

function getEmojiPacks() {
  return request<EmojiPack[]>({
    method: "GET",
    url: "/api/emoji",
  });
}

export { getEmojiPacks };
