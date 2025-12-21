import { request } from "../base";

interface VerifyEmailRequestData {
  email: string;
  code: string;
}

interface VerifyEmailResponse {
  success: boolean;
}

function verifyEmail(data: VerifyEmailRequestData) {
  return request<VerifyEmailResponse>({
    method: "POST",
    url: "/api/auth/verify-email",
    data: data,
  });
}

export { verifyEmail };
