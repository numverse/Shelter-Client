import { refreshTokens } from "../api/auth/refreshTokens";

let isAuthed = false;

async function checkAuthed(): Promise<boolean> {
  const res = await refreshTokens();
  if (!res.ok) {
    if (res.statusCode === 401) {
      isAuthed = false;
    }
  } else {
    isAuthed = true;
  }
  return isAuthed;
}

function setAuthed(value: boolean) {
  isAuthed = value;
}

export { isAuthed, checkAuthed, setAuthed };
