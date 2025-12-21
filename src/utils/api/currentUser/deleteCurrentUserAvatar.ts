import { request } from "../base";

function deleteCurrentUserAvatar() {
  return request<void>({
    method: "DELETE",
    url: "/api/users/@me/avatar",
  });
}

export { deleteCurrentUserAvatar };
