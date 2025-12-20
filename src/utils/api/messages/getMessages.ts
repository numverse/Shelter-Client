import { request } from "../base";

function getMessages(channelId: string, limit: string, before: string) {
  return request({
    method: "GET",
    url: `/api/messages/${channelId}?limit=${limit}&before=${before}`,
  });
}

function getMessageAround(messageId: string, beforeCount: string, afterCount: string) {
  return request({
    method: "GET",
    url: `/api/messages/around/${messageId}?beforeCount=${beforeCount}&afterCount=${afterCount}`,
  });
}

export { getMessages, getMessageAround };
