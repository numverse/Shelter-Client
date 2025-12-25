import { request } from "../base";

interface ForgotPasswordRequestData {
  email: string;
}

interface ForgotPasswordResponse {
  success: boolean;
}

function forgotPassword(data: ForgotPasswordRequestData) {
  return request<ForgotPasswordResponse>({
    method: "POST",
    url: "/api/auth/forgot",
    data: data,
  });
}

export { forgotPassword };
