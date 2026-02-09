import { request } from "../base";
import { CurrentUserInterface } from "../../../structures/interfaces/CurrentUserInterface";

interface UpdateCurrentUserRequestData {
  username?: string;
  displayName?: string;
}

function updateCurrentUserProfile(data: UpdateCurrentUserRequestData) {
  return request<CurrentUserInterface>({
    method: "PATCH",
    url: "/api/users/@me/profile",
    data: data,
  });
}

export { updateCurrentUserProfile };
