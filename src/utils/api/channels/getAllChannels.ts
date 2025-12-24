import { request, Channel } from "../base";

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
