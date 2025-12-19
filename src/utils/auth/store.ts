import { getCurrentUser } from "../api/users/getCurrentUser";

let isAuthed = false;

async function checkAuthed(): Promise<boolean> {
  const res = await getCurrentUser();
  if (!res.ok) {
    if (res.code === "401") {
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
