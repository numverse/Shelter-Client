import { request } from "../base";
import { User } from "../types";

function getUserById(userId: string) {
  return request<User>({
    method: "GET",
    url: `/api/users/${userId}`,
  });
}

export { getUserById };
