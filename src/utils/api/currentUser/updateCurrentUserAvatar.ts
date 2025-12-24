import { request } from "../base";
import { CurrentUser } from "../types";

function updateCurrentUserAvatar(avatar: File) {
  const formData = new FormData();
  formData.append("file", avatar);
  return request<CurrentUser>({
    method: "PUT",
    url: "/api/users/@me/avatar",
    data: formData,
  });
}

export { updateCurrentUserAvatar };
