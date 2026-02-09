import type { ChannelInterface, ChannelType } from "./interfaces/ChannelInterface";

import { userDataMap } from "src/stores/users";

export class Channel implements ChannelInterface {
  id: string;
  type: ChannelType;
  parentId?: string;
  name: string;
  position: number;
  description?: string;
  createdAt: string;
  updatedAt?: string;

  constructor(userData: ChannelInterface) {
    this.id = userData.id;
    this.type = userData.type;
    this.parentId = userData.parentId;
    this.name = userData.name;
    this.position = userData.position;
    this.description = userData.description;
    this.createdAt = userData.createdAt;
    this.updatedAt = userData.updatedAt;
  }
}
