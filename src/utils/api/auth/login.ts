import { request } from "../base";

interface LoginRequestData {
  email: string;
  password: string;
}

interface LoginResponse {
  userId: string;
}

/**
 * Log in a user with the provided credentials.
 * @param data - The login request data containing email and password.
 * @returns The login response containing the user ID.
 */
function login(data: LoginRequestData) {
  return request<LoginResponse>({
    method: "POST",
    url: "/api/auth/login",
    data: data,
  });
}

export { login };
