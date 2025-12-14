type ResponseData = {
  userId: string;
} | {
  error: string;
};

interface RequestData {
  email: string;
  password: string;
}

import { request } from "../request";

function login(requestData: RequestData): Promise<ResponseData> {
  return request<ResponseData>("/api/auth/login", {
    method: "POST",
    data: {
      ...requestData,
    },
  });
}

export { login };
