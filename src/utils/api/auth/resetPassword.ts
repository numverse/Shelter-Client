import { request } from "../base";

type ResetPasswordRequestData = {
  token: string;
  newPassword: string;
} | {
  oldPassword: string;
  newPassword: string;
};

interface VerifyEmailResponse {
  success: boolean;
}

function resetPassword(data: ResetPasswordRequestData) {
  return request<VerifyEmailResponse>({
    method: "POST",
    url: "/api/auth/reset-password",
    data: data,
  });
}

export { resetPassword };
