import { request, User } from "../base";

interface GetCurrentUserResponse extends User {
  email: string;
  emojiPacks: string[];
  updatedAt: string;
}

function getCurrentUser() {
  return request<GetCurrentUserResponse>({
    method: "GET",
    url: "/api/users/@me",
  });
}

export { getCurrentUser };
