import { request } from "../base";

function createEmojiPack() {
  return request({
    method: "POST",
    url: "/api/emoji",
  });
}

export { createEmojiPack };
