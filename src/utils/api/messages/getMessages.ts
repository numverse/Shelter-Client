import { request } from "../base";
import { Message } from "../types";

interface GetMessagesRequestData {
  channelId: string;
  messageId?: string;
  limit?: string;
}

interface GetMessagesResponse {
  messages: Message[];
  hasMore: boolean;
}

function getMessages(data: GetMessagesRequestData) {
  const params = new URLSearchParams();
  if (data.limit) params.append("limit", data.limit);
  if (data.messageId) params.append("messageId", data.messageId);

  return request<GetMessagesResponse>({
    method: "GET",
    url: `/api/channels/${data.channelId}/messages?${params.toString()}`,
  });
}

export { getMessages, GetMessagesRequestData };
