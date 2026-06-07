import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";
import test from "node:test";

const execFileAsync = promisify(execFile);

test("send-approval --dry-run prints the approval message without Feishu credentials", async () => {
  const root = await mkdtemp(join(tmpdir(), "ai-life-feishu-send-"));
  try {
    const inputPath = join(root, "approval.json");
    await writeFile(
      inputPath,
      JSON.stringify({
        id: "approval-dry-run-001",
        topic: "是否联系候选商家",
        reason: "准备触达真实商家，属于外部动作",
        prepared: "已整理候选名单和话术草案",
        recommendation: "先联系 1 家低风险候选",
      }),
      "utf8",
    );

    const { stdout } = await execFileAsync("node", [
      "runtime/adapters/feishu/send-approval.mjs",
      "--dry-run",
      inputPath,
    ]);
    const output = JSON.parse(stdout);

    assert.equal(output.sent, false);
    assert.equal(output.dry_run, true);
    assert.equal(output.approval_id, "approval-dry-run-001");
    assert.match(output.text, /【需要你确认】/);
    assert.match(output.text, /事项：是否联系候选商家/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
