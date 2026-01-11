interface Attachment {
  id: string;
  filename: string;
  mimeType: string;
  size: number;
}

interface Message {
  id: string;
  channelId: string;
  authorId: string;
  content: string;
  replyTo?: string;
  createdAt: string;
  updatedAt?: string;
  attachments?: Attachment[];
  reactions?: [
    {
      emojiId: string;
      userIds: string[];
    },
  ];
  status?: "SENDING" | "FAILED";
}

interface EmojiPack {
  id: string;
  name: string;
  creatorId: string;
  createdAt: string;
  updatedAt: string;
  emojis: [
    {
      id: string;
      name: string;
    },
  ];
}

enum ChannelType {
  GuildText = 0,
  DM = 1,
  GuildVoice = 2,
  GroupDM = 3,
  GuildCategory = 4,
}

interface Channel {
  id: string;
  type: ChannelType;
  parentId?: string;
  name: string;
  position: number;
  description?: string;
  createdAt: string;
  updatedAt?: string;
}

type PresenceStatus = "online" | "offline" | "away" | "dnd";

interface User {
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

enum UserFlags {
  NONE = 0,
  EARLY_MEMBER = 1,
  MEMBER = 2,
  MODERATOR = 4,
  DEVELOPER = 8,
}

interface CurrentUser extends User {
  email: string;
  emojiPacks: string[];
  updatedAt: string;
}

export { Attachment, Message, EmojiPack, Channel, ChannelType, User, UserFlags, CurrentUser, PresenceStatus };
