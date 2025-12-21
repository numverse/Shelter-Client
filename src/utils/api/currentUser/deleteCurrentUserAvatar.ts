import { request } from "../base";

function deleteCurrentUserAvatar() {
  return request({
    method: "DELETE",
    url: "/api/users/@me/avatar",
  });
}

export { deleteCurrentUserAvatar };
