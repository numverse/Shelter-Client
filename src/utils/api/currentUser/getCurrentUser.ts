import { request, CurrentUser } from "../base";

function getCurrentUser() {
  return request<CurrentUser>({
    method: "GET",
    url: "/api/users/@me",
  });
}

export { getCurrentUser };
