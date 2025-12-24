import ky from "ky";
import { strings } from "../i18n/localeStrings";

const baseURL = "https://shelter.zero624.dev";

interface requestData {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  url: string;
  timeout?: number;
  headers?: Record<string, string>;
  data?: object;
}

interface errorResponse {
  code: keyof typeof strings["errors"];
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
  const headers = {
    ...(data.headers ?? {}),
  };
  if (!(data.data instanceof FormData) && data.data) {
    headers["Content-Type"] = "application/json";
  }
  const res = await ky(`${baseURL}${data.url}`, {
    method: data.method,
    timeout: data.timeout ?? 5000,
    throwHttpErrors: false,
    credentials: "include",
    headers: headers,
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
