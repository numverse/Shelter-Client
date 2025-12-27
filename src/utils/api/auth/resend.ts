import { request } from "../base";

interface ResendResponse {
  success: boolean;
}

function resend() {
  return request<ResendResponse>({
    method: "POST",
    url: "/api/auth/resend",
  });
}

export { resend };
