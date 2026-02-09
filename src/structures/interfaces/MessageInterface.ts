export interface AttachmentInterface {
  id: string;
  filename: string;
  mimeType: string;
  size: number;
}

export interface MessageInterface {
  id: string;
  channelId: string;
  authorId: string;
  content: string;
  replyTo?: string;
  createdAt: string;
  updatedAt?: string;
  attachments?: AttachmentInterface[];
  reactions?: [
    {
      emojiId: string;
      userIds: string[];
    },
  ];
  status?: "SENDING" | "FAILED";
}
