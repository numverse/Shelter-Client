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
  attachments: Attachment[];
  reactions: [
    {
      emojiId: string;
      userIds: string[];
    },
  ];
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

interface Channel {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt?: string;
}

interface User {
  id: string;
  username: string;
  displayName?: string;
  flags: number;
  avatarId?: string;
  createdAt: string;
}

interface CurrentUser extends User {
  email: string;
  emojiPacks: string[];
  updatedAt: string;
}

export { Attachment, Message, EmojiPack, Channel, User, CurrentUser };
