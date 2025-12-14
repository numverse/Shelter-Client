type ResponseData = {
  userId: string;
} | {
  error: string;
};

interface RequestData {
  username: string;
  password: string;
  email: string;
}

import { request } from "../request";

function register(requestData: RequestData): Promise<ResponseData> {
  return request<ResponseData>("/api/auth/register", {
    method: "POST",
    data: {
      ...requestData,
    },
  });
}

export { register };
