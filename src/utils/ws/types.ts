import { Channel, Message } from "../api/types";

interface ReactionPayload {
  messageId: string;
  emojiId: string;
  userId: string;
}

interface PresenceUpdatePayload {
  userId: string;
  status: "online" | "offline" | "away" | "dnd";
}

enum GatewayOpCode {
  DISPATCH = 0,
  HEARTBEAT = 1,
  HEARTBEAT_ACK = 2,
  MESSAGE_CREATE = 3,
  MESSAGE_UPDATE = 4,
  MESSAGE_DELETE = 5,
  REACTION_ADD = 6,
  REACTION_REMOVE = 7,
  PRESENCE_UPDATE = 8,
  CHANNEL_CREATE = 9,
  CHANNEL_UPDATE = 10,
  CHANNEL_DELETE = 11,
}

interface EventMap {
  open: Event;
  error: Event;
  close: CloseEvent;
  MESSAGE_CREATE: Message;
  MESSAGE_UPDATE: Message;
  MESSAGE_DELETE: {
    messageId: string;
    channelId: string;
  };
  REACTION_ADD: ReactionPayload;
  REACTION_REMOVE: ReactionPayload;
  PRESENCE_UPDATE: PresenceUpdatePayload;
  CHANNEL_CREATE: Channel;
  CHANNEL_UPDATE: Channel;
  CHANNEL_DELETE: {
    channelId: string;
  };
};

export { GatewayOpCode, EventMap };
