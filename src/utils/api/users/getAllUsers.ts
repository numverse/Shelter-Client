import { request } from "../base";
import { User } from "../types";

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
