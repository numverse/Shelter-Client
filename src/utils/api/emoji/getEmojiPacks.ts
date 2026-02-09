import { request } from "../base";
import { EmojiPackInterface } from "../types";

function getEmojiPacks() {
  return request<EmojiPackInterface[]>({
    method: "GET",
    url: "/api/emoji",
  });
}

export { getEmojiPacks };
