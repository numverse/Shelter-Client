import type { BaseUser } from "./BaseUser";
import type { MessageInterface, AttachmentInterface } from "./interfaces/MessageInterface";

import { userDataMap } from "../stores/users";

export class Message implements MessageInterface {
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

  constructor(userData: MessageInterface) {
    this.id = userData.id;
    this.channelId = userData.channelId;
    this.authorId = userData.authorId;
    this.content = userData.content;
    this.replyTo = userData.replyTo;
    this.createdAt = userData.createdAt;
    this.updatedAt = userData.updatedAt;
    this.attachments = userData.attachments;
    this.reactions = userData.reactions;
  }

  get author(): BaseUser | undefined {
    return userDataMap.get(this.authorId);
  }
}
