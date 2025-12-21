import { request, CurrentUser } from "../base";

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
