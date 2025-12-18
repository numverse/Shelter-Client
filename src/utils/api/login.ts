import { request } from "./base";

interface loginData {
  email: string;
  password: string;
}

interface loginResponse {
  userId: string;
}

function login(data: loginData) {
  return request<loginResponse>({
    method: "POST",
    url: "/api/auth/login",
    data: data,
  });
}

export { login };
