import { request, User } from "../base";

interface GetAllUsersResponse {
  users: User[];
}

function getAllUsers() {
  return request<GetAllUsersResponse>({
    method: "GET",
    url: "/api/users",
  });
}

export { getAllUsers };
