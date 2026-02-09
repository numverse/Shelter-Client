export interface EmojiPackInterface {
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
