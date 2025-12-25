import { request } from "../base";
import { Message } from "../types";

interface GetMessagesAroundResponse {
  anchor: Message;
  before: {
    messages: Message[];
    hasMore: boolean;
  };
  after: {
    messages: Message[];
    hasMore: boolean;
  };
}

function getMessagesAround(messageId: string, beforeCount: string, afterCount: string) {
  return request<GetMessagesAroundResponse>({
    method: "GET",
    url: `/api/messages/around/${messageId}?beforeCount=${beforeCount}&afterCount=${afterCount}`,
  });
}

export { getMessagesAround };
