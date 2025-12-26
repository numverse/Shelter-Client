import { request } from "../base";

interface RemoveAttachmentRequestData {
  messageId: string;
  attachmentId: string;
}

function removeAttachmentFromMessage(data: RemoveAttachmentRequestData) {
  return request<void>({
    method: "DELETE",
    url: `/api/messages/${data.messageId}/attachments/${data.attachmentId}`,
  });
}

export { removeAttachmentFromMessage };
