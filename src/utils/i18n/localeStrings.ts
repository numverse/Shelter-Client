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
    username: {
      "en-US": "Username",
      "ko-KR": "이름",
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
      "en-US": "6~32 characters",
      "ko-KR": "6~32자",
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
  help: {
    need_an_account: {
      "en-US": "Need an account? ",
      "ko-KR": "계정이 없으신가요? ",
    },
    have_an_account: {
      "en-US": "Have an account? ",
      "ko-KR": "이미 계정이 있으신가요? ",
    },
  },
  errors: {
    unknown: {
      "en-US": "An unknown error occurred.",
      "ko-KR": "알 수 없는 오류가 발생했습니다.",
    },
    authentication_required: {
      "en-US": "Authentication is required to perform this action.",
      "ko-KR": "이 작업을 수행하려면 로그인이 필요합니다.",
    },
    invalid_or_expired_refresh_token: {
      "en-US": "Your session has expired. Please log in again.",
      "ko-KR": "세션이 만료되었습니다. 다시 로그인해주세요.",
    },
    invalid_user_token: {
      "en-US": "Your session is invalid. Please log in again.",
      "ko-KR": "세션이 유효하지 않습니다. 다시 로그인해주세요.",
    },
    invalid_email_password: {
      "en-US": "The email or password you entered is incorrect.",
      "ko-KR": "입력하신 이메일 또는 비밀번호가 올바르지 않습니다.",
    },
    login_failed: {
      "en-US": "Login failed. Please try again.",
      "ko-KR": "로그인에 실패했습니다. 다시 시도해주세요.",
    },
    token_refresh_failed: {
      "en-US": "Failed to refresh session. Please log in again.",
      "ko-KR": "세션 갱신에 실패했습니다. 다시 로그인해주세요.",
    },
    no_refresh_token: {
      "en-US": "No refresh token found. Please log in again.",
      "ko-KR": "리프레시 토큰이 없습니다. 다시 로그인해주세요.",
    },
    file_not_found: {
      "en-US": "The requested file was not found.",
      "ko-KR": "요청한 파일을 찾을 수 없습니다.",
    },
    failed_to_delete_file: {
      "en-US": "Failed to delete the file. Please try again.",
      "ko-KR": "파일 삭제에 실패했습니다. 다시 시도해주세요.",
    },
    file_too_large: {
      "en-US": "The file you are trying to upload is too large.",
      "ko-KR": "업로드하려는 파일이 너무 큽니다.",
    },
    file_type_not_allowed: {
      "en-US": "The file type you are trying to upload is not allowed.",
      "ko-KR": "업로드하려는 파일 형식이 허용되지 않습니다.",
    },
    no_files_uploaded: {
      "en-US": "No files were uploaded. Please select files to upload.",
      "ko-KR": "업로드된 파일이 없습니다. 업로드할 파일을 선택해주세요.",
    },
    permission_denied: {
      "en-US": "You do not have permission to perform this action.",
      "ko-KR": "이 작업을 수행할 권한이 없습니다.",
    },
    pack_not_found: {
      "en-US": "The requested emoji pack was not found.",
      "ko-KR": "요청한 이모지 팩을 찾을 수 없습니다.",
    },
    failed_to_delete_pack: {
      "en-US": "Failed to delete the emoji pack. Please try again.",
      "ko-KR": "이모지 팩 삭제에 실패했습니다. 다시 시도해주세요.",
    },
    failed_to_update_pack: {
      "en-US": "Failed to update the emoji pack. Please try again.",
      "ko-KR": "이모지 팩 업데이트에 실패했습니다. 다시 시도해주세요.",
    },
    pack_name_required: {
      "en-US": "Emoji pack name is required.",
      "ko-KR": "이모지 팩 이름은 필수입니다.",
    },
    pack_requires_emoji: {
      "en-US": "At least one emoji is required to create an emoji pack.",
      "ko-KR": "이모지 팩을 생성하려면 최소한 하나의 이모지가 필요합니다.",
    },
    missing_required_fields: {
      "en-US": "Please fill in all required fields.",
      "ko-KR": "모든 필수 항목을 작성해주세요.",
    },
    message_requires_content_or_attachments: {
      "en-US": "A message must have content or attachments.",
      "ko-KR": "메시지에는 내용 또는 첨부파일이 있어야 합니다.",
    },
    message_not_found: {
      "en-US": "The requested message was not found.",
      "ko-KR": "요청한 메시지를 찾을 수 없습니다.",
    },
    failed_to_delete_message: {
      "en-US": "Failed to delete the message. Please try again.",
      "ko-KR": "메시지 삭제에 실패했습니다. 다시 시도해주세요.",
    },
    failed_to_update_message: {
      "en-US": "Failed to update the message. Please try again.",
      "ko-KR": "메시지 업데이트에 실패했습니다. 다시 시도해주세요.",
    },
    no_valid_fields: {
      "en-US": "No valid fields to update were provided.",
      "ko-KR": "업데이트할 유효한 필드가 제공되지 않았습니다.",
    },
    username_taken: {
      "en-US": "The username is already taken. Please choose another one.",
      "ko-KR": "이미 사용 중인 이름입니다. 다른 이름을 선택해주세요.",
    },
    failed_to_update_profile: {
      "en-US": "Failed to update profile. Please try again.",
      "ko-KR": "프로필 업데이트에 실패했습니다. 다시 시도해주세요.",
    },
    no_file_uploaded: {
      "en-US": "No file was uploaded. Please select a file to upload.",
      "ko-KR": "업로드된 파일이 없습니다. 업로드할 파일을 선택해주세요.",
    },
    file_must_be_image: {
      "en-US": "The uploaded file must be an image.",
      "ko-KR": "업로드된 파일은 이미지여야 합니다.",
    },
    avatar_too_large: {
      "en-US": "The avatar image must be less than 5MB.",
      "ko-KR": "아바타 이미지는 5MB 미만이어야 합니다.",
    },
    failed_to_update_avatar: {
      "en-US": "Failed to update avatar. Please try again.",
      "ko-KR": "아바타 업데이트에 실패했습니다. 다시 시도해주세요.",
    },
    no_avatar_to_delete: {
      "en-US": "No avatar to delete.",
      "ko-KR": "삭제할 아바타가 없습니다.",
    },
    failed_to_delete_avatar: {
      "en-US": "Failed to delete avatar. Please try again.",
      "ko-KR": "아바타 삭제에 실패했습니다. 다시 시도해주세요.",
    },
    emoji_not_found: {
      "en-US": "The requested emoji was not found.",
      "ko-KR": "요청한 이모지를 찾을 수 없습니다.",
    },
    avatar_not_found: {
      "en-US": "The requested avatar was not found.",
      "ko-KR": "요청한 아바타를 찾을 수 없습니다.",
    },
    user_has_no_avatar: {
      "en-US": "The user has no avatar.",
      "ko-KR": "사용자에게 아바타가 없습니다.",
    },
    avatar_id_mismatch: {
      "en-US": "The provided avatar ID does not match the user's current avatar.",
      "ko-KR": "제공된 아바타 ID가 사용자의 현재 아바타와 일치하지 않습니다.",
    },
    channel_not_found: {
      "en-US": "The requested channel was not found.",
      "ko-KR": "요청한 채널을 찾을 수 없습니다.",
    },
  },
};

export { locales, strings };
