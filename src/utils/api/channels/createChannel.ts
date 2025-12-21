import { request, Channel } from "../base";

interface CreateChannelRequestData {
  name: string;
  description: string;
}

function createChannel(data: CreateChannelRequestData) {
  return request<Channel>({
    method: "POST",
    url: "/api/channels",
    data: data,
  });
}

export { createChannel };
