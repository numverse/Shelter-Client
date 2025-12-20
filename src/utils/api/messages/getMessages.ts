import { request } from "../base";

function getMessages(channelId: string, limit: string, before: string) {
  return request({
    method: "GET",
    url: `/api/messages/${channelId}?limit=${limit}&before=${before}`,
  });
}


export { getMessages };
