import { request } from "../base";
import { EmojiPack } from "../types";

function getEmojiPacks() {
  return request<EmojiPack[]>({
    method: "GET",
    url: "/api/emoji",
  });
}

export { getEmojiPacks };
