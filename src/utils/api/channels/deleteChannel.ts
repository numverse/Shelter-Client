import { request } from "../base";

/**
 * Delete a channel by its ID.
 * @param channelId - The ID of the channel to be deleted.
 * @returns A promise indicating the completion of the delete operation.
 */
function deleteChannel(channelId: string) {
  return request({
    method: "DELETE",
    url: `/api/channels/${channelId}`,
  });
}

export { deleteChannel };
