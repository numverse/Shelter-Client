import { request } from "../base";

interface LoginRequestData {
  email: string;
  password: string;
}

interface LoginResponse {
  userId: string;
}

function login(data: LoginRequestData) {
  return request<LoginResponse>({
    method: "POST",
    url: "/api/auth/login",
    data: data,
  });
}

export { login };
