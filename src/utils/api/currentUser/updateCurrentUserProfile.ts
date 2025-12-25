import { request } from "../base";
import { CurrentUser } from "../types";

interface UpdateCurrentUserRequestData {
  username?: string;
  displayName?: string;
}

function updateCurrentUserProfile(data: UpdateCurrentUserRequestData) {
  return request<CurrentUser>({
    method: "PATCH",
    url: "/api/users/@me/profile",
    data: data,
  });
}

export { updateCurrentUserProfile };
