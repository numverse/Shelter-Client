import { request } from "../base";
import { EmojiPack } from "../types";

interface UpdateEmojiPackRequestData {
  name?: string;
  emojis?: {
    name?: string;
    image?: File;
  }[];
  existingEmoji?: {
    id: string;
    name?: string;
  }[];
}

function updateEmojiPack(emojiPackId: string, data: UpdateEmojiPackRequestData) {
  const formData = new FormData();
  if (data.name) {
    formData.append("name", data.name);
  }
  data.emojis?.forEach((emoji) => {
    if (emoji.name) {
      formData.append("emojiNames", emoji.name);
    }
    if (emoji.image) {
      formData.append("files", emoji.image);
    }
  });
  data.existingEmoji?.forEach((emoji) => {
    if (emoji.id) {
      formData.append("existingEmojiIds", emoji.id);
    }
    if (emoji.name) {
      formData.append("existingEmojiNames", emoji.name);
    }
  });
  return request<EmojiPack>({
    method: "PUT",
    url: `/api/emoji-packs/${emojiPackId}`,
    data: formData,
  });
}

export { updateEmojiPack };
