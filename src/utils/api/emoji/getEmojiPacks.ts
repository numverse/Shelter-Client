import { request } from "../base";
import { EmojiPackInterface } from "../../../structures/interfaces/EmojiPackInterface";

function getEmojiPacks() {
  return request<EmojiPackInterface[]>({
    method: "GET",
    url: "/api/emoji",
  });
}

export { getEmojiPacks };
