import { request } from "../base";
import { ChannelInterface } from "../../../structures/interfaces/ChannelInterface";

interface GetAllChannelsResponse {
  channels: ChannelInterface[];
}

function getAllChannels() {
  return request<GetAllChannelsResponse>({
    method: "GET",
    url: "/api/channels",
  });
}

export { getAllChannels };
