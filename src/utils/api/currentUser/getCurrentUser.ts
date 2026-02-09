import { request } from "../base";
import { CurrentUserInterface } from "../../../structures/interfaces/CurrentUserInterface";

function getCurrentUser() {
  return request<CurrentUserInterface>({
    method: "GET",
    url: "/api/users/@me",
  });
}

export { getCurrentUser };
