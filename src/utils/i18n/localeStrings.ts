const locales = {
  "en-US": "English (US)",
  "ko-KR": "한국어 (KR)",
};

const strings = {
  ui: {
    login: {
      "en-US": "Login",
      "ko-KR": "로그인",
    },
    register: {
      "en-US": "Register",
      "ko-KR": "회원가입",
    },
    email: {
      "en-US": "Email",
      "ko-KR": "이메일",
    },
    password: {
      "en-US": "Password",
      "ko-KR": "비밀번호",
    },
    new_password: {
      "en-US": "New Password",
      "ko-KR": "새 비밀번호",
    },
    username: {
      "en-US": "Username",
      "ko-KR": "이름",
    },
    displayName: {
      "en-US": "Display Name",
      "ko-KR": "별명",
    },
    okay: {
      "en-US": "Okay",
      "ko-KR": "확인",
    },
  },
  loading: {
    login: {
      "en-US": "Logging in...",
      "ko-KR": "로그인 중...",
    },
    register: {
      "en-US": "Registering...",
      "ko-KR": "회원가입 중...",
    },
  },
  placeholders: {
    username: {
      "en-US": "2~32 characters",
      "ko-KR": "2~32자",
    },
    displayName: {
      "en-US": "2~32 characters",
      "ko-KR": "2~32자",
    },
    email: {
      "en-US": "email@example.com",
      "ko-KR": "이메일@내도메인.한국",
    },
    password: {
      "en-US": "8~64 characters",
      "ko-KR": "8~64자",
    },
  },
  validation: {
    username: {
      "en-US": "Please only use numbers, letters, underscores _ , or periods.",
      "ko-KR": "숫자, 영어, 밑줄 _, 마침표만 사용해주세요.",
    },
    username_taken: {
      "en-US": "Username is unavailable. Try adding numbers, letters, underscores _ , or periods.",
      "ko-KR": "이미 사용 중인 이름입니다. 숫자, 영어, 밑줄 _, 마침표를 추가해보세요.",
    },
  },
  info: {
    instructions_sent: {
      "en-US": "Instructions Sent",
      "ko-KR": "지시사항을 전송했어요",
    },
    reset_instructions_before_email: {
      "en-US": "We sent instructions to change your password to ",
      "ko-KR": "비밀번호 변경 방법을 ",
    },
    reset_instructions_after_email: {
      "en-US": ", please check both your inbox and spam folder.",
      "ko-KR": "(으)로 보냈어요. 받은 편지함과 스팸 편지함을 모두 확인해주세요.",
    },
  },
  help: {
    forgot_password: {
      "en-US": "Forgot your password?",
      "ko-KR": "비밀번호를 잊으셨나요?",
    },
    need_an_account: {
      "en-US": "Need an account? ",
      "ko-KR": "계정이 없으신가요? ",
    },
    have_an_account: {
      "en-US": "Have an account? ",
      "ko-KR": "이미 계정이 있으신가요? ",
    },
  },
  verify: {
    login: {
      "en-US": "Log In",
      "ko-KR": "로그인",
    },
    link_expired: {
      "en-US": "Email verification link has expired or is invalid",
      "ko-KR": "이메일 인증 링크가 만료되었거나 유효하지 않습니다",
    },
    login_resend: {
      "en-US": "Please log in and resend the link",
      "ko-KR": "로그인 후 링크를 재전송해주세요",
    },
  },
  reset: {
    change_password: {
      "en-US": "Change Your Password",
      "ko-KR": "비밀번호 변경",
    },
    reset_password: {
      "en-US": "Reset Password",
      "ko-KR": "비밀번호 재설정",
    },
  },
  errors: {
    unknown: {
      "en-US": "An unknown error occurred.",
      "ko-KR": "알 수 없는 오류가 발생했습니다.",
    },
    AUTHENTICATION_REQUIRED: {
      "en-US": "Authentication is required to perform this action.",
      "ko-KR": "이 작업을 수행하려면 로그인이 필요합니다.",
    },
    INVALID_OR_EXPIRED_REFRESH_TOKEN: {
      "en-US": "Your session has expired. Please log in again.",
      "ko-KR": "세션이 만료되었습니다. 다시 로그인해주세요.",
    },
    INVALID_USER_TOKEN: {
      "en-US": "Your session is invalid. Please log in again.",
      "ko-KR": "세션이 유효하지 않습니다. 다시 로그인해주세요.",
    },
    INVALID_EMAIL_PASSWORD: {
      "en-US": "The email or password you entered is incorrect.",
      "ko-KR": "입력하신 이메일 또는 비밀번호가 올바르지 않습니다.",
    },
    LOGIN_FAILED: {
      "en-US": "Login failed. Please try again.",
      "ko-KR": "로그인에 실패했습니다. 다시 시도해주세요.",
    },
    TOKEN_REFRESH_FAILED: {
      "en-US": "Failed to refresh session. Please log in again.",
      "ko-KR": "세션 갱신에 실패했습니다. 다시 로그인해주세요.",
    },
    NO_REFRESH_TOKEN: {
      "en-US": "No refresh token found. Please log in again.",
      "ko-KR": "리프레시 토큰이 없습니다. 다시 로그인해주세요.",
    },
    FILE_NOT_FOUND: {
      "en-US": "The requested file was not found.",
      "ko-KR": "요청한 파일을 찾을 수 없습니다.",
    },
    FAILED_TO_DELETE_FILE: {
      "en-US": "Failed to delete the file. Please try again.",
      "ko-KR": "파일 삭제에 실패했습니다. 다시 시도해주세요.",
    },
    FILE_TOO_LARGE: {
      "en-US": "The file you are trying to upload is too large.",
      "ko-KR": "업로드하려는 파일이 너무 큽니다.",
    },
    FILE_TYPE_NOT_ALLOWED: {
      "en-US": "The file type you are trying to upload is not allowed.",
      "ko-KR": "업로드하려는 파일 형식이 허용되지 않습니다.",
    },
    NO_FILES_UPLOADED: {
      "en-US": "No files were uploaded. Please select files to upload.",
      "ko-KR": "업로드된 파일이 없습니다. 업로드할 파일을 선택해주세요.",
    },
    PERMISSION_DENIED: {
      "en-US": "You do not have permission to perform this action.",
      "ko-KR": "이 작업을 수행할 권한이 없습니다.",
    },
    PACK_NOT_FOUND: {
      "en-US": "The requested emoji pack was not found.",
      "ko-KR": "요청한 이모지 팩을 찾을 수 없습니다.",
    },
    FAILED_TO_DELETE_PACK: {
      "en-US": "Failed to delete the emoji pack. Please try again.",
      "ko-KR": "이모지 팩 삭제에 실패했습니다. 다시 시도해주세요.",
    },
    FAILED_TO_UPDATE_PACK: {
      "en-US": "Failed to update the emoji pack. Please try again.",
      "ko-KR": "이모지 팩 업데이트에 실패했습니다. 다시 시도해주세요.",
    },
    PACK_NAME_REQUIRED: {
      "en-US": "Emoji pack name is required.",
      "ko-KR": "이모지 팩 이름은 필수입니다.",
    },
    PACK_REQUIRES_EMOJI: {
      "en-US": "At least one emoji is required to create an emoji pack.",
      "ko-KR": "이모지 팩을 생성하려면 최소한 하나의 이모지가 필요합니다.",
    },
    MISSING_REQUIRED_FIELDS: {
      "en-US": "Please fill in all required fields.",
      "ko-KR": "모든 필수 항목을 작성해주세요.",
    },
    MESSAGE_REQUIRES_CONTENT_OR_ATTACHMENTS: {
      "en-US": "A message must have content or attachments.",
      "ko-KR": "메시지에는 내용 또는 첨부파일이 있어야 합니다.",
    },
    MESSAGE_NOT_FOUND: {
      "en-US": "The requested message was not found.",
      "ko-KR": "요청한 메시지를 찾을 수 없습니다.",
    },
    FAILED_TO_DELETE_MESSAGE: {
      "en-US": "Failed to delete the message. Please try again.",
      "ko-KR": "메시지 삭제에 실패했습니다. 다시 시도해주세요.",
    },
    FAILED_TO_UPDATE_MESSAGE: {
      "en-US": "Failed to update the message. Please try again.",
      "ko-KR": "메시지 업데이트에 실패했습니다. 다시 시도해주세요.",
    },
    NO_VALID_FIELDS: {
      "en-US": "No valid fields to update were provided.",
      "ko-KR": "업데이트할 유효한 필드가 제공되지 않았습니다.",
    },
    FST_ERR_VALIDATION: {
      "en-US": "Invalid data format. Please check your input.",
      "ko-KR": "잘못된 데이터 형식입니다. 입력한 내용을 확인해주세요.",
    },
    USERNAME_TAKEN: {
      "en-US": "This username is already taken. Please choose another one.",
      "ko-KR": "이미 사용 중인 이름입니다. 다른 이름을 선택해주세요.",
    },
    EMAIL_EXISTS: {
      "en-US": "The email is already registered. Please use another email.",
      "ko-KR": "이미 등록된 이메일입니다. 다른 이메일을 사용해주세요.",
    },
    FAILED_TO_UPDATE_PROFILE: {
      "en-US": "Failed to update profile. Please try again.",
      "ko-KR": "프로필 업데이트에 실패했습니다. 다시 시도해주세요.",
    },
    NO_FILE_UPLOADED: {
      "en-US": "No file was uploaded. Please select a file to upload.",
      "ko-KR": "업로드된 파일이 없습니다. 업로드할 파일을 선택해주세요.",
    },
    FILE_MUST_BE_IMAGE: {
      "en-US": "The uploaded file must be an image.",
      "ko-KR": "업로드된 파일은 이미지여야 합니다.",
    },
    AVATAR_TOO_LARGE: {
      "en-US": "The avatar image must be less than 5MB.",
      "ko-KR": "아바타 이미지는 5MB 미만이어야 합니다.",
    },
    FAILED_TO_UPDATE_AVATAR: {
      "en-US": "Failed to update avatar. Please try again.",
      "ko-KR": "아바타 업데이트에 실패했습니다. 다시 시도해주세요.",
    },
    NO_AVATAR_TO_DELETE: {
      "en-US": "No avatar to delete.",
      "ko-KR": "삭제할 아바타가 없습니다.",
    },
    FAILED_TO_DELETE_AVATAR: {
      "en-US": "Failed to delete avatar. Please try again.",
      "ko-KR": "아바타 삭제에 실패했습니다. 다시 시도해주세요.",
    },
    EMOJI_NOT_FOUND: {
      "en-US": "The requested emoji was not found.",
      "ko-KR": "요청한 이모지를 찾을 수 없습니다.",
    },
    AVATAR_NOT_FOUND: {
      "en-US": "The requested avatar was not found.",
      "ko-KR": "요청한 아바타를 찾을 수 없습니다.",
    },
    USER_HAS_NO_AVATAR: {
      "en-US": "The user has no avatar.",
      "ko-KR": "사용자에게 아바타가 없습니다.",
    },
    AVATAR_ID_MISMATCH: {
      "en-US": "The provided avatar ID does not match the user's current avatar.",
      "ko-KR": "제공된 아바타 ID가 사용자의 현재 아바타와 일치하지 않습니다.",
    },
    CHANNEL_NOT_FOUND: {
      "en-US": "The requested channel was not found.",
      "ko-KR": "요청한 채널을 찾을 수 없습니다.",
    },
    INVALID_OR_EXPIRED_VERIFICATION_TOKEN: {
      "en-US": "The verification token is invalid or has expired.",
      "ko-KR": "인증 토큰이 유효하지 않거나 만료되었습니다.",
    },
    RATE_LIMIT_EXCEEDED: {
      "en-US": "Rate limit exceeded. Please try again later.",
      "ko-KR": "요청 한도 초과입니다. 나중에 다시 시도해주세요.",
    },
  },
};

export { locales, strings };
