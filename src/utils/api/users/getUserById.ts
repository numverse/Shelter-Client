import { request, User } from "../base";

function getUserById(userId: string) {
  return request<User>({
    method: "GET",
    url: `/api/users/${userId}`,
  });
}

export { getUserById };
