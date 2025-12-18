import ky from "ky";

const baseURL = "https://shelter.zero624.dev";

interface requestData {
  method: string;
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

export { request };
