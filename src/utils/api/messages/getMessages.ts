import { Message, request } from "../base";

interface GetMessagesResponse {
  messages: Message[];
  hasMore: boolean;
}

function getMessages(channelId: string, limit: string, before: string) {
  return request<GetMessagesResponse>({
    method: "GET",
    url: `/api/messages/${channelId}?limit=${limit}&before=${before}`,
  });
}

export { getMessages };
