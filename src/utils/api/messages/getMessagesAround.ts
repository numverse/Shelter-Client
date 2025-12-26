import { request } from "../base";
import { Message } from "../types";

interface GetMessagesAroundRequestData {
  messageId: string;
  beforeCount: string;
  afterCount: string;
}

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

function getMessagesAround(data: GetMessagesAroundRequestData) {
  const params = new URLSearchParams();
  if (data.beforeCount) params.append("beforeCount", data.beforeCount);
  if (data.afterCount) params.append("afterCount", data.afterCount);

  return request<GetMessagesAroundResponse>({
    method: "GET",
    url: `/api/messages/around/${data.messageId}?${params.toString()}`,
  });
}

export { getMessagesAround };
