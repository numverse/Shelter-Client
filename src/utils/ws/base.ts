import { GatewayOpCode, EventMap } from "./types";

type EventKeys = keyof EventMap;

type Listeners = { [K in EventKeys]?: Array<(payload: EventMap[K]) => void> };

function createWebSocket(url: string, protocols?: string | string[]) {
  let socket: WebSocket | null = null;
  const eventListeners: Listeners = {};
  let latency: number | null = null;

  function connect() {
    socket = new WebSocket(url, protocols);
    socket.onopen = (event) => handleEvent("open", event);
    socket.onmessage = (ev) => {
      const { op, d } = JSON.parse(ev.data);
      if (op === GatewayOpCode.HEARTBEAT) {
        return send(JSON.stringify({
          op: GatewayOpCode.HEARTBEAT_ACK,
        }));
      }
      handleEvent(GatewayOpCode[op] as EventKeys, d);
    };
    socket.onerror = (event) => handleEvent("error", event);
    socket.onclose = (event) => {
      handleEvent("close", event);
      latency = null;
    };
  }

  function handleEvent<K extends EventKeys>(eventType: K, payload: EventMap[K]) {
    const list = eventListeners[eventType] as Array<(p: EventMap[K]) => void> | undefined;
    if (list) list.forEach((l) => l(payload));
  }

  function send(data: string | ArrayBuffer | Blob | ArrayBufferView) {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(data);
    } else {
      throw new Error("WebSocket is not open. Unable to send message.");
    }
  }

  function close() {
    if (socket) {
      try {
        socket.close();
      } catch {
        // ignore
      }
      socket = null;
    }
  }

  function reconnect() {
    close();
    connect();
  }

  function on<K extends EventKeys>(eventType: K, listener: (payload: EventMap[K]) => void) {
    const list = (eventListeners[eventType] ??= []) as Array<(p: EventMap[K]) => void>;
    list.push(listener);
  }

  function off<K extends EventKeys>(eventType: K, listener: (payload: EventMap[K]) => void) {
    const list = eventListeners[eventType] as Array<(p: EventMap[K]) => void> | undefined;
    if (list) eventListeners[eventType] = list.filter((l) => l !== listener) as Listeners[K];
  }

  function once<K extends EventKeys>(eventType: K, listener: (payload: EventMap[K]) => void) {
    const onceListener = (payload: EventMap[K]) => {
      listener(payload);
      off(eventType, onceListener);
    };
    on(eventType, onceListener);
  }

  connect();

  return {
    send,
    close,
    reconnect,
    on,
    off,
    once,
    get ping() {
      return latency;
    },
    get readyState() {
      return socket?.readyState;
    },
  };
}

export { createWebSocket };
