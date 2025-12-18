import { request, User } from "../base";

function getAllUsers() {
  return request<User[]>({
    method: "GET",
    url: "/api/users",
  });
}

export { getAllUsers };
