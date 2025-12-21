import { request } from "../base";

interface RegisterRequestData {
  username: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  success: boolean;
}

function register(data: RegisterRequestData) {
  return request<RegisterResponse>({
    method: "POST",
    url: "/api/auth/register",
    data: data,
  });
}

export { register };
