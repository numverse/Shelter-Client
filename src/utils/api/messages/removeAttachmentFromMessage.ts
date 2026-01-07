import { request } from "../base";

interface RemoveAttachmentRequestData {
  channelId: string;
  messageId: string;
  attachmentId: string;
}

function removeAttachmentFromMessage(data: RemoveAttachmentRequestData) {
  return request<void>({
    method: "DELETE",
    url: `/api/channels/${data.channelId}/messages/${data.messageId}/attachments/${data.attachmentId}`,
  });
}

export { removeAttachmentFromMessage };
