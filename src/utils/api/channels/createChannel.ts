import { request } from "../base";
import { ChannelInterface } from "../../../structures/interfaces/ChannelInterface";

interface CreateChannelRequestData {
  name: string;
  description: string;
}

function createChannel(data: CreateChannelRequestData) {
  return request<ChannelInterface>({
    method: "POST",
    url: "/api/channels",
    data: data,
  });
}

export { createChannel };
