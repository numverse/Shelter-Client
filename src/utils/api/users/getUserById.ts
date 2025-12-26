import { request } from "../base";
import { User } from "../types";

interface GetUserByIdRequestData {
  userId: string;
}

function getUserById(data: GetUserByIdRequestData) {
  return request<User>({
    method: "GET",
    url: `/api/users/${data.userId}`,
  });
}

export { getUserById };
