export enum ChannelType {
  GuildText = 0,
  DM = 1,
  GuildVoice = 2,
  GroupDM = 3,
  GuildCategory = 4,
}

export interface ChannelInterface {
  id: string;
  type: ChannelType;
  parentId?: string;
  name: string;
  position: number;
  description?: string;
  createdAt: string;
  updatedAt?: string;
}
