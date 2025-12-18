import { request } from "../base";

function updateCurrentUserAvatar() {
  return request({
    method: "PUT",
    url: "/api/users/@me/avatar",
  });
}

export { updateCurrentUserAvatar };
