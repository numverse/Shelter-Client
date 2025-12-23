import { Channel, Message } from "../api/base";

export interface ReactionPayload {
  messageId: string;
  emojiId: string;
  userId: string;
}

export interface PresenceUpdatePayload {
  userId: string;
  status: "online" | "offline" | "away" | "dnd";
}

type EventMap = {
  open: Event;
  error: Event;
  close: CloseEvent;

  message_create: Message;
  message_update: Message;
  message_delete: string; // messageId

  reaction_add: ReactionPayload;
  reaction_remove: ReactionPayload;

  channel_create: Channel;
  channel_update: Channel;
  channel_delete: string; // channelId

  presence_update: PresenceUpdatePayload;
};

type EventType = keyof EventMap;

type Listeners = { [K in EventType]?: Array<(payload: EventMap[K]) => void> };

class BaseWebSocket {
  private socket: WebSocket | null = null;
  private url: string;
  private protocols?: string | string[];
  private reconnectInterval?: number;
  private eventListeners: Listeners = {};
  private latency: number | null = null;

  constructor(url: string, protocols?: string | string[], reconnectInterval?: number) {
    this.url = url;
    this.protocols = protocols;
    this.reconnectInterval = reconnectInterval;
    this.connect();
  }

  private connect() {
    this.socket = new WebSocket(this.url, this.protocols);
    this.socket.onopen = (event) => this.handleEvent("open", event);
    this.socket.onmessage = (ev) => {
      const { type, payload } = JSON.parse(ev.data);
      if (type) {
        this.handleEvent(type, payload);
      }
    };
    this.socket.onerror = (event) => this.handleEvent("error", event);
    this.socket.onclose = (event) => {
      this.handleEvent("close", event);
      if (this.reconnectInterval !== undefined) {
        setTimeout(() => this.connect(), this.reconnectInterval);
      }
    };
  }

  private handleEvent<K extends EventType>(eventType: K, payload: EventMap[K]) {
    const list = this.eventListeners[eventType] as Array<(p: EventMap[K]) => void> | undefined;
    if (list) list.forEach((l) => l(payload));
  }

  public send(data: string | ArrayBuffer | Blob | ArrayBufferView) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(data);
    } else {
      throw new Error("WebSocket is not open. Unable to send message.");
    }
  }

  public close() {
    this.reconnectInterval = undefined;
    if (this.socket) {
      this.socket.close();
    }
  }

  public on<K extends EventType>(eventType: K, listener: (payload: EventMap[K]) => void) {
    const list = (this.eventListeners[eventType] ??= []) as Array<(p: EventMap[K]) => void>;
    list.push(listener);
  }

  public off<K extends EventType>(eventType: K, listener: (payload: EventMap[K]) => void) {
    const list = this.eventListeners[eventType] as Array<(p: EventMap[K]) => void> | undefined;
    if (list) this.eventListeners[eventType] = list.filter((l) => l !== listener) as Listeners[K];
  }

  get ping() {
    return this.latency;
  }
}

export { BaseWebSocket };

const client = new BaseWebSocket("ws://localhost:8080/ws", undefined, 5000);
client.on("channel_create", (channel) => {
  console.log("New channel created:", channel);
});
