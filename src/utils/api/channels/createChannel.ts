import { request, Channel } from "../base";

interface CreateChannelRequestData {
  name: string;
  description: string;
}

/**
 * Create a new channel with the provided details.
 * @param data - The channel creation request data containing name and description.
 * @returns The created channel details.
 */
function createChannel(data: CreateChannelRequestData) {
  return request<Channel>({
    method: "POST",
    url: "/api/channels",
    data: data,
  });
}

export { createChannel };
