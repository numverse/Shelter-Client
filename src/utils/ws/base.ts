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

export enum GatewayOpCode {
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

type EventMap = {
  open: Event;
  error: Event;
  close: CloseEvent;

  MESSAGE_CREATE: Message;
  MESSAGE_UPDATE: Message;
  MESSAGE_DELETE: string; // messageId

  REACTION_ADD: ReactionPayload;
  REACTION_REMOVE: ReactionPayload;

  PRESENCE_UPDATE: PresenceUpdatePayload;

  CHANNEL_CREATE: Channel;
  CHANNEL_UPDATE: Channel;
  CHANNEL_DELETE: string; // channelId
};

type EventType = keyof EventMap;

type Listeners = { [K in EventType]?: Array<(payload: EventMap[K]) => void> };

class BaseWebSocket {
  private socket: WebSocket | null = null;
  private url: string;
  private protocols?: string | string[];
  private eventListeners: Listeners = {};
  private latency: number | null = null;

  constructor(url: string, protocols?: string | string[]) {
    this.url = url;
    this.protocols = protocols;
    this.connect();
  }

  private connect() {
    this.socket = new WebSocket(this.url, this.protocols);
    this.socket.onopen = (event) => this.handleEvent("open", event);
    this.socket.onmessage = (ev) => {
      const { op, d } = JSON.parse(ev.data);
      if (op === GatewayOpCode.HEARTBEAT) {
        return this.send(JSON.stringify({
          op: GatewayOpCode.HEARTBEAT_ACK,
        }));
      }
      this.handleEvent(GatewayOpCode[op] as EventType, d);
    };
    this.socket.onerror = (event) => this.handleEvent("error", event);
    this.socket.onclose = (event) => {
      this.handleEvent("close", event);
      this.latency = null;
    };
  }

  public reconnect() {
    if (this.socket?.readyState !== WebSocket.CLOSED) {
      this.close();
    }
    this.connect();
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
    if (this.socket) {
      try {
        this.socket.close();
      } catch {
        /* ignore */
      }
      this.socket = null;
    }
  }

  public once<K extends EventType>(eventType: K, listener: (payload: EventMap[K]) => void) {
    const onceListener = (payload: EventMap[K]) => {
      listener(payload);
      this.off(eventType, onceListener);
    };
    this.on(eventType, onceListener);
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

  get readyState() {
    return this.socket?.readyState;
  }
}

export { BaseWebSocket };
