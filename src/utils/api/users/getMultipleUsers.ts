import { request, User } from "../base";

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
