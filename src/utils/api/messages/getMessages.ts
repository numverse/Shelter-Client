import { request } from "../base";
import { Message } from "../types";

interface GetMessagesRequestData {
  channelId: string;
  limit: string;
  before: string;
}

interface GetMessagesResponse {
  messages: Message[];
  hasMore: boolean;
}

function getMessages(data: GetMessagesRequestData) {
  return request<GetMessagesResponse>({
    method: "GET",
    url: `/api/messages/${data.channelId}?limit=${data.limit}&before=${data.before}`,
  });
}

export { getMessages };
