import ky from "ky";
import baseURL from "./baseURL";

interface loginData {
  email: string;
  password: string;
}

async function login(data: loginData) {
  const res = await ky(`${baseURL}/api/auth/login`, {
    method: "POST",
    timeout: 5000,
    throwHttpErrors: false,
    headers: {
      "Content-Type": "application/json",
    },
    json: data,
  });
  if (!res.ok) {
    const body = await res.json<{ error: string }>();
    return {
      ok: false,
      error: body.error,
    };
  } else {
    const body = await res.json<{ userId: string }>();
    return {
      ok: true,
      userId: body.userId,
    };
  }
}

export { login };
