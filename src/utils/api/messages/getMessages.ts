import { request } from "../base";
import { Message } from "../types";

interface GetMessagesRequestData {
  channelId: string;
  around?: string;
  after?: string;
  before?: string;
  limit?: string;
}

interface GetMessagesResponse {
  messages: Message[];
}

function getMessages(data: GetMessagesRequestData) {
  const params = new URLSearchParams();
  if (data.limit) params.append("limit", data.limit);
  if (data.before) params.append("before", data.before);
  if (data.after) params.append("after", data.after);
  if (data.around) params.append("around", data.around);

  return request<GetMessagesResponse>({
    method: "GET",
    url: `/api/channels/${data.channelId}/messages?${params.toString()}`,
  });
}

export { getMessages, GetMessagesRequestData };
