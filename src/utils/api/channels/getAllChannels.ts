import { request, Channel } from "../base";

/**
 * Fetch all available channels.
 * @returns A list of all channels.
 */
function getAllChannels() {
  return request<Channel[]>({
    method: "GET",
    url: "/api/channels",
  });
}

export { getAllChannels };
