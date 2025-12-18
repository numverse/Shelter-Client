import { request } from "../base";

interface UpdateChannelRequestData {
  name: string;
  description: string;
}

interface UpdateChannelResponse {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

function updateChannel(channelId: string, data: UpdateChannelRequestData) {
  return request<UpdateChannelResponse>({
    method: "PATCH",
    url: `/api/channels/${channelId}`,
    data: data,
  });
}

export { updateChannel };
