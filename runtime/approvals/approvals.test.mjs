import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import { buildApprovalMessage, mapUserReply } from "./protocol.mjs";
import { saveApprovalDecision } from "./store.mjs";

test("buildApprovalMessage formats a channel-neutral P0 confirmation request", () => {
  const message = buildApprovalMessage({
    topic: "是否联系候选商家",
    reason: "准备触达真实商家，属于外部动作",
    prepared: "已整理候选名单和话术草案",
    recommendation: "先联系 1 家低风险候选",
    deadline: "2026-06-08 18:00",
  });

  assert.match(message, /【需要你确认】/);
  assert.match(message, /事项：是否联系候选商家/);
  assert.match(message, /为什么找你：准备触达真实商家，属于外部动作/);
  assert.match(message, /窗口截止时间：2026-06-08 18:00/);
  assert.match(message, /1 批准/);
  assert.match(message, /5 晚点再说/);
});

test("mapUserReply maps numeric and simple natural-language replies", () => {
  assert.deepEqual(mapUserReply("1"), {
    decision: "approved",
    reply_code: "1",
    reply_label: "批准",
  });
  assert.deepEqual(mapUserReply(" 3 给我更多依据 "), {
    decision: "needs_more_info",
    reply_code: "3",
    reply_label: "给我更多信息",
  });
  assert.deepEqual(mapUserReply("同意，继续"), {
    decision: "approved",
    reply_code: "1",
    reply_label: "批准",
  });
  assert.deepEqual(mapUserReply("我还没想好"), {
    decision: "unclear",
    reply_code: null,
    reply_label: "无法判断",
  });
});

test("saveApprovalDecision writes resolved decisions under data approvals structure", async () => {
  const root = await mkdtemp(join(tmpdir(), "ai-life-approval-"));
  try {
    const recordPath = await saveApprovalDecision({
      approvalsDir: root,
      approval: {
        id: "approval-test-001",
        level: "P0",
        topic: "是否发布公开内容",
        recommended_action: "先暂停，补充风险说明",
        source_file: "experiments/example.md",
      },
      replyText: "2",
      channel: "feishu",
      receivedAt: "2026-06-07T12:00:00+08:00",
    });

    assert.equal(
      recordPath,
      join(root, "resolved", "2026-06-07-approval-test-001.json"),
    );

    const saved = JSON.parse(await readFile(recordPath, "utf8"));

    assert.equal(saved.notification_id, "approval-test-001");
    assert.equal(saved.level, "P0");
    assert.equal(saved.decision, "paused");
    assert.equal(saved.user_reply, "2");
    assert.equal(saved.channel, "feishu");
    assert.equal(saved.next_action, "暂停该动作，保留资产，必要时写入复盘");
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
