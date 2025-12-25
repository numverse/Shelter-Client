import { request } from "../base";
import { User } from "../types";

interface GetMultipleUsersRequestData {
  userIds: string[];
}

interface GetMultipleUsersResponse {
  users: User[];
}

function getMultipleUsers(data: GetMultipleUsersRequestData) {
  return request<GetMultipleUsersResponse>({
    method: "POST",
    url: "/api/users/batch",
    data: data,
  });
}

export { getMultipleUsers };
