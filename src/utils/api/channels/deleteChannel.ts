import { request } from "../base";

function deleteChannel(channelId: string) {
  return request<void>({
    method: "DELETE",
    url: `/api/channels/${channelId}`,
  });
}

export { deleteChannel };
