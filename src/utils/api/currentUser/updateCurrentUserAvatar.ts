import { request } from "../base";
import type { GetCurrentUserResponse } from "./getCurrentUser";

/**
 * Update the current user's avatar.
 * @param avatar - The new avatar file to be uploaded.
 * @returns The updated current user's details.
 */
function updateCurrentUserAvatar(avatar: File) {
  const formData = new FormData();
  formData.append("file", avatar);
  return request<GetCurrentUserResponse>({
    method: "PUT",
    url: "/api/users/@me/avatar",
    data: formData,
  });
}

export { updateCurrentUserAvatar };
