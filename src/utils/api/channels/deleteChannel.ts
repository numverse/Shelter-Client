import { request } from "../base";

interface deleteChannelRequestData {
  channelId: string;
}

function deleteChannel(data: deleteChannelRequestData) {
  return request<void>({
    method: "DELETE",
    url: `/api/channels/${data.channelId}`,
  });
}

export { deleteChannel };
