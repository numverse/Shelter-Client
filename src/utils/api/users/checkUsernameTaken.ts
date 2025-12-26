import { request } from "../base";

interface CheckUsernameTakenResponse {
  taken: boolean;
}

function checkUsernameTaken(username: string) {
  return request<CheckUsernameTakenResponse>({
    method: "POST",
    url: "/api/users/username-attempt",
    data: {
      username,
    },
  });
}

export { checkUsernameTaken };
