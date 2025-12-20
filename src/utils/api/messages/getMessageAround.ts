import { request } from "../base";

function getMessageAround(messageId: string, beforeCount: string, afterCount: string) {
    return request({
        method: "GET",
        url: `/api/messages/around/${messageId}?beforeCount=${beforeCount}&afterCount=${afterCount}`,
    });
}

export { getMessageAround };