import { request } from "../base";
import { CurrentUser } from "../types";

function getCurrentUser() {
  return request<CurrentUser>({
    method: "GET",
    url: "/api/users/@me",
  });
}

export { getCurrentUser };
