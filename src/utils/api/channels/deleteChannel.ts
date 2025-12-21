import { request } from "../base";

function deleteChannel(channelId: string) {
  return request({
    method: "DELETE",
    url: `/api/channels/${channelId}`,
  });
}

export { deleteChannel };
