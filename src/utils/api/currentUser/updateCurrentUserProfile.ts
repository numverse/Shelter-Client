import { request } from "../base";
import type { GetCurrentUserResponse } from "./getCurrentUser";

interface UpdateCurrentUserRequestData {
  username: string;
}

/**
 * Update the current user's profile information.
 * @param data - The profile update request data containing the new username.
 * @returns The updated current user's details.
 */
function updateCurrentUserProfile(data: UpdateCurrentUserRequestData) {
  return request<GetCurrentUserResponse>({
    method: "PATCH",
    url: "/api/users/@me/profile",
    data: data,
  });
}

export { updateCurrentUserProfile };
