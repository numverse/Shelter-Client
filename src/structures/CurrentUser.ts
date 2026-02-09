import { BaseUser } from "./BaseUser";
import type { CurrentUserInterface } from "./interfaces/CurrentUserInterface";

export class CurrentUser extends BaseUser implements CurrentUserInterface {
  email: string;
  emojiPacks: string[];
  updatedAt: string;

  constructor(userData: CurrentUserInterface) {
    super(userData);
    this.email = userData.email;
    this.emojiPacks = userData.emojiPacks;
    this.updatedAt = userData.updatedAt;
  }
}
