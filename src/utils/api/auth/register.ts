import { request } from "../base";

interface RegisterRequestData {
  username: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  success: boolean;
}

/**
 * Register a new user with the provided details.
 * @param data - The registration request data containing username, email, and password.
 * @returns The registration response indicating success status.
 */
function register(data: RegisterRequestData) {
  return request<RegisterResponse>({
    method: "POST",
    url: "/api/auth/register",
    data: data,
  });
}

export { register };
