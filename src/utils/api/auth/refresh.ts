import { request } from "../base";

interface RefreshResponse {
  success: boolean;
}

/**
 * Refresh the authentication token.
 * @returns The response indicating success status.
 */
function refresh() {
  return request<RefreshResponse>({
    method: "POST",
    url: "/api/auth/refresh",
  });
}

export { refresh };
