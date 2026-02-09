import { request } from "../base";
import { BaseUserInterface } from "../../../structures/interfaces/BaseUserInterface";

interface GetAllUsersResponse {
  users: BaseUserInterface[];
}

function getAllUsers() {
  return request<GetAllUsersResponse>({
    method: "GET",
    url: "/api/users",
  });
}

export { getAllUsers };
