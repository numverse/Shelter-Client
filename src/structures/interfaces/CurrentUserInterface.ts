import type { BaseUserInterface } from "./BaseUserInterface";

export interface CurrentUserInterface extends BaseUserInterface {
  email: string;
  emojiPacks: string[];
  updatedAt: string;
}
