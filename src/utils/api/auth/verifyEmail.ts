import { request } from "../base";

interface VerifyEmailRequestData {
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
