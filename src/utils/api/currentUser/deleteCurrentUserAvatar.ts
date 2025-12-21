import { request } from "../base";

/**
 * Delete the current user's avatar.
 * @returns A promise indicating the completion of the delete operation.
 */
function deleteCurrentUserAvatar() {
  return request({
    method: "DELETE",
    url: "/api/users/@me/avatar",
  });
}

export { deleteCurrentUserAvatar };
