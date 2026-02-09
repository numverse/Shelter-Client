import { request } from "../base";
import { BaseUserInterface } from "../../../structures/interfaces/BaseUserInterface";

interface GetUserByIdRequestData {
  userId: string;
}

function getUserById(data: GetUserByIdRequestData) {
  return request<BaseUserInterface>({
    method: "GET",
    url: `/api/users/${data.userId}`,
  });
}

export { getUserById };
