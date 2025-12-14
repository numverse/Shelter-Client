import ky from "ky";

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  data?: Record<string, unknown>;
}

const BASE_URL = "https://shelter.zero624.dev";

async function request<T>(url: string, options: RequestOptions = {}): Promise<T> {
  return ky(BASE_URL + url, {
    method: options.method,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    json: options.data,
  }).json();
}

export { request };
