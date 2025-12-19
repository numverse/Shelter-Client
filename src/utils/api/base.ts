import ky from "ky";

const baseURL = "https://shelter.zero624.dev";

interface requestData {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  url: string;
  timeout?: number;
  headers?: Record<string, string>;
  data?: object;
}

interface errorResponse {
  code: string;
  message: string;
  error: string;
  statusCode: number;
}

type requestResponse<T> = {
  ok: false;
} & errorResponse | {
  ok: true;
} & T;

async function request<T>(data: requestData): Promise<requestResponse<T>> {
  const res = await ky(`${baseURL}${data.url}`, {
    method: data.method,
    timeout: data.timeout ?? 5000,
    throwHttpErrors: false,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...data.headers,
    },
    json: data.data,
  });
  if (!res.ok) {
    const body = await res.json<errorResponse>();
    return {
      ok: false,
      ...body,
    };
  } else {
    const body = await res.json<T>();
    return {
      ok: true,
      ...body,
    };
  }
}

interface EmojiPack {
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

interface Channel {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface User {
  id: string;
  username: string;
  avatarId: string;
  createdAt: string;
}

export { request, EmojiPack, Channel, User };
