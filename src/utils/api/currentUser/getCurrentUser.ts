import { request, User } from "../base";

interface GetCurrentUserResponse extends User {
  email: string;
  emojiPacks: string[];
  updatedAt: string;
}

/**
 * Fetch the current user's details.
 * @returns The current user's details.
 */
function getCurrentUser() {
  return request<GetCurrentUserResponse>({
    method: "GET",
    url: "/api/users/@me",
  });
}

export { getCurrentUser, type GetCurrentUserResponse };
