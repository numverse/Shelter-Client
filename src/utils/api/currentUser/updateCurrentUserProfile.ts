import { request } from "../base";
import type { GetCurrentUserResponse } from "./getCurrentUser";

interface UpdateCurrentUserRequestData {
  username: string;
}

function updateCurrentUserProfile(data: UpdateCurrentUserRequestData) {
  return request<GetCurrentUserResponse>({
    method: "PATCH",
    url: "/api/users/@me/profile",
    data: data,
  });
}

export { updateCurrentUserProfile };
