import { request } from "../base";
import { CurrentUserInterface } from "../../../structures/interfaces/CurrentUserInterface";

interface UpdateCurrentUserAvatarRequestData {
  avatar: File;
}

function updateCurrentUserAvatar(data: UpdateCurrentUserAvatarRequestData) {
  const formData = new FormData();
  formData.append("file", data.avatar);
  return request<CurrentUserInterface>({
    method: "PUT",
    url: "/api/users/@me/avatar",
    data: formData,
  });
}

export { updateCurrentUserAvatar };
