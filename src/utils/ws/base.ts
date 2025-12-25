import { GatewayOpCode, EventMap, WS } from "./types";

type EventType = keyof EventMap;

type Listeners = { [K in EventType]?: Array<(payload: EventMap[K]) => void> };

class BaseWebSocket implements WS {
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
        this.latency = this.latency === null ? Date.now() - d.ts : (this.latency * 7 + (Date.now() - d.ts)) / 8;
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
    this.close();
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
