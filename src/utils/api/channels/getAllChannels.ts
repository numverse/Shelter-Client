import { request, Channel } from "../base";

function getAllChannels() {
  return request<Channel[]>({
    method: "GET",
    url: "/api/channels",
  });
}

export { getAllChannels };
