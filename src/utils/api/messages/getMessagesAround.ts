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
  return request<GetMessagesAroundResponse>({
    method: "GET",
    url: `/api/messages/around/${data.messageId}?beforeCount=${data.beforeCount}&afterCount=${data.afterCount}`,
  });
}

export { getMessagesAround };
