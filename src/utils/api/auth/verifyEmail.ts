import { request } from "../base";

interface VerifyEmailRequestData {
  email: string;
  code: string;
}

interface VerifyEmailResponse {
  success: boolean;
}

/**
 * Verify a user's email with the provided code.
 * @param data - The verification request data containing email and code.
 * @returns The verification response indicating success status.
 */
function verifyEmail(data: VerifyEmailRequestData) {
  return request<VerifyEmailResponse>({
    method: "POST",
    url: "/api/auth/verify-email",
    data: data,
  });
}

export { verifyEmail };
