import { request } from "../base";

function removeAttachmentFromMessage(messageId: string, attachmentId: string) {
  return request<void>({
    method: "DELETE",
    url: `/api/messages/${messageId}/attachments/${attachmentId}`,
  });
}

export { removeAttachmentFromMessage };
