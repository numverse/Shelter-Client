import { request } from "../base";

interface LogoutResponse {
  success: boolean;
}

/**
 * Log out the current user.
 * @returns The logout response indicating success status.
 */
function logout() {
  return request<LogoutResponse>({
    method: "POST",
    url: "/api/auth/logout",
  });
}

export { logout };
