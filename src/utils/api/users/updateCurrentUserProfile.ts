import { request } from "../base";

interface UpdateCurrentUserProfileResponse {
  username: string;
}

function updateCurrentUserProfile() {
  return request<UpdateCurrentUserProfileResponse>({
    method: "PATCH",
    url: "/api/users/@me/profile",
  });
}

export { updateCurrentUserProfile };
