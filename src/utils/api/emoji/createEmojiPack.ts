import { request } from "../base";
import { EmojiPack } from "../types";

interface CreateEmojiPackRequestData {
  name: string;
  emojis: {
    name: string;
    image: File;
  }[];
}

function createEmojiPack(data: CreateEmojiPackRequestData) {
  const formData = new FormData();
  formData.append("name", data.name);
  data.emojis.forEach((emoji) => {
    formData.append("emojiNames", emoji.name);
    formData.append("files", emoji.image);
  });
  return request<EmojiPack>({
    method: "POST",
    url: "/api/emoji-packs",
    data: formData,
  });
}

export { createEmojiPack };
