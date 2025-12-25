import { request } from "../base";
import { Channel } from "../types";

interface GetAllChannelsResponse {
  channels: Channel[];
}

function getAllChannels() {
  return request<GetAllChannelsResponse>({
    method: "GET",
    url: "/api/channels",
  });
}

export { getAllChannels };
