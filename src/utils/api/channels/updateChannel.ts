import { request } from "../base";

interface UpdateChannelRequestData {
  name?: string;
  description?: string;
}

interface UpdateChannelResponse {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Update an existing channel with the provided details.
 * @param channelId - The ID of the channel to be updated.
 * @param data - The channel update request data containing name and description.
 * @returns The updated channel details.
 */
function updateChannel(channelId: string, data: UpdateChannelRequestData) {
  return request<UpdateChannelResponse>({
    method: "PATCH",
    url: `/api/channels/${channelId}`,
    data: data,
  });
}

export { updateChannel };
