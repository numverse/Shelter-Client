export type PresenceStatus = "online" | "offline" | "away" | "dnd";

export enum UserFlags {
  NONE = 0,
  EARLY_MEMBER = 1,
  MEMBER = 2,
  MODERATOR = 4,
  DEVELOPER = 8,
}

export interface BaseUserInterface {
  id: string;
  username: string;
  displayName?: string;
  presence: {
    status: PresenceStatus;
  };
  flags: number;
  avatarId?: string;
  createdAt: string;
}
