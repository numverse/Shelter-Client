import { request } from "../base";

interface LogoutResponse {
  success: boolean;
}

function logout() {
  return request<LogoutResponse>({
    method: "POST",
    url: "/api/auth/logout",
  });
}

export { logout };
