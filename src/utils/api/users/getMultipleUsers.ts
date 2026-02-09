import { request } from "../base";
import { BaseUserInterface } from "../../../structures/interfaces/BaseUserInterface";

interface GetMultipleUsersRequestData {
  userIds: string[];
}

interface GetMultipleUsersResponse {
  users: BaseUserInterface[];
}

function getMultipleUsers(data: GetMultipleUsersRequestData) {
  return request<GetMultipleUsersResponse>({
    method: "POST",
    url: "/api/users/batch",
    data: data,
  });
}

export { getMultipleUsers };
