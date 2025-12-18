import { request } from "./base";

interface registerData {
  username: string;
  email: string;
  password: string;
}

interface registerResponse {
  userId: string;
}

function register(data: registerData) {
  return request<registerResponse>({
    method: "POST",
    url: "/api/auth/register",
    data: data,
  });
}

export { register };
