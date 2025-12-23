type EventMap = {
  open: Event;
  message: MessageEvent;
  error: Event;
  close: CloseEvent;
};

type EventType = keyof EventMap;

class BaseWebSocket {
  private socket: WebSocket | null = null;
  private url: string;
  private protocols?: string | string[];
  private reconnectInterval: number;
  private shouldReconnect: boolean = true;
  private eventListeners: { [key: string]: ((event: Event) => void)[] } = {};

  constructor(url: string, protocols?: string | string[], reconnectInterval: number = 5000) {
    this.url = url;
    this.protocols = protocols;
    this.reconnectInterval = reconnectInterval;
    this.connect();
  }

  private connect() {
    this.socket = new WebSocket(this.url, this.protocols);
    this.socket.onopen = (event) => this.handleEvent("open", event);
    this.socket.onmessage = (event) => this.handleEvent("message", event);
    this.socket.onerror = (event) => this.handleEvent("error", event);
    this.socket.onclose = (event) => {
      this.handleEvent("close", event);
      if (this.shouldReconnect) {
        setTimeout(() => this.connect(), this.reconnectInterval);
      }
    };
  }

  private handleEvent(eventType: string, event: Event) {
    const listeners = this.eventListeners[eventType];
    if (listeners) {
      listeners.forEach((listener) => listener(event));
    }
  }

  public send(data: string | ArrayBuffer | Blob | ArrayBufferView) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(data);
    } else {
      throw new Error("WebSocket is not open. Unable to send message.");
    }
  }

  public close() {
    this.shouldReconnect = false;
    if (this.socket) {
      this.socket.close();
    }
  }

  public on(eventType: EventType, listener: (event: Event) => void) {
    if (!this.eventListeners[eventType]) {
      this.eventListeners[eventType] = [];
    }
    this.eventListeners[eventType].push(listener);
  }

  public off(eventType: EventType, listener: (event: Event) => void) {
    const listeners = this.eventListeners[eventType];
    if (listeners) {
      this.eventListeners[eventType] = listeners.filter((l) => l !== listener);
    }
  }
}

export { BaseWebSocket };
