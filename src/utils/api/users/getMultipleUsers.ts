import { request, User } from "../base";

interface GetMultipleUsersRequestData {
  userIds: string[];
}

function getMultipleUsers(data: GetMultipleUsersRequestData) {
  return request<User[]>({
    method: "POST",
    url: "/api/users/batch",
    data: data,
  });
}

export { getMultipleUsers };
