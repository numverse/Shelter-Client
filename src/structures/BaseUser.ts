import type { BaseUserInterface, PresenceStatus } from "./interfaces/BaseUserInterface";

export class BaseUser implements BaseUserInterface {
  id: string;
  username: string;
  _displayName?: string;
  flags: number;
  avatarId?: string;
  createdAt: string;
  presence: {
    status: PresenceStatus;
  };

  constructor(userData: BaseUserInterface) {
    this.id = userData.id;
    this.username = userData.username;
    this._displayName = userData.displayName;
    this.presence = userData.presence;
    this.flags = userData.flags;
    this.avatarId = userData.avatarId;
    this.createdAt = userData.createdAt;
  }

  get displayName(): string {
    return this._displayName ?? this.username;
  }

  get avatarUrl(): string {
    if (this.avatarId) {
      return `https://shelter.zero624.dev/cdn/avatars/${this.id}/${this.avatarId}.png`;
    }
    return `/avatars/${(BigInt(this.id ?? 0) >> 22n) % 6n}.png`;
  }
}
