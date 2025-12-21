import { request } from "../base";
import type { GetCurrentUserResponse } from "./getCurrentUser";

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
