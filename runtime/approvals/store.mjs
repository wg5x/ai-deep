import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

import { mapUserReply, REPLY_MAP } from "./protocol.mjs";

export async function saveApprovalDecision({
  approvalsDir,
  approval,
  replyText,
  channel,
  receivedAt = new Date().toISOString(),
}) {
  const mapped = mapUserReply(replyText);
  const nextAction = mapped.reply_code
    ? REPLY_MAP[mapped.reply_code].next_action
    : "无法判断用户回复，需要再次确认";
  const date = receivedAt.slice(0, 10);
  const resolvedDir = join(approvalsDir, "resolved");
  const recordPath = join(resolvedDir, `${date}-${approval.id}.json`);
  const record = {
    date,
    notification_id: approval.id,
    level: approval.level ?? "P0",
    topic: approval.topic,
    recommended_action: approval.recommended_action,
    user_reply: replyText,
    decision: mapped.decision,
    reply_code: mapped.reply_code,
    reply_label: mapped.reply_label,
    next_action: nextAction,
    channel,
    received_at: receivedAt,
    source_file: approval.source_file ?? null,
    notes: approval.notes ?? "",
  };

  await mkdir(resolvedDir, { recursive: true });
  await writeFile(recordPath, `${JSON.stringify(record, null, 2)}\n`, "utf8");

  return recordPath;
}
