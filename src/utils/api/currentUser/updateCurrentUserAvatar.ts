import { request } from "../base";
import { CurrentUser } from "../types";

interface UpdateCurrentUserAvatarRequestData {
  avatar: File;
}

function updateCurrentUserAvatar(data: UpdateCurrentUserAvatarRequestData) {
  const formData = new FormData();
  formData.append("file", data.avatar);
  return request<CurrentUser>({
    method: "PUT",
    url: "/api/users/@me/avatar",
    data: formData,
  });
}

export { updateCurrentUserAvatar };
