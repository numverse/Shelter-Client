import { request } from "../base";

interface RefreshResponse {
  success: boolean;
}

function refreshTokens() {
  return request<RefreshResponse>({
    method: "POST",
    url: "/api/auth/refresh",
  });
}

export { refreshTokens };
