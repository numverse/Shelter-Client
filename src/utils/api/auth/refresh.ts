import { request } from "../base";

interface RefreshResponse {
  success: boolean;
}

function refresh() {
  return request<RefreshResponse>({
    method: "POST",
    url: "/api/auth/refresh",
  });
}

export { refresh };
