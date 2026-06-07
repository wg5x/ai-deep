#!/usr/bin/env node

import { readFile } from "node:fs/promises";

import { buildApprovalMessage } from "../../approvals/protocol.mjs";
import { requireFeishuConfig } from "./channel.mjs";

const FEISHU_BASE_URL = "https://open.feishu.cn/open-apis";

async function requestJson(url, options) {
  const response = await fetch(url, options);
  const body = await response.json().catch(() => ({}));

  if (!response.ok || body.code !== 0) {
    throw new Error(
      `Feishu API request failed: ${response.status} ${JSON.stringify(body)}`,
    );
  }

  return body;
}

async function getTenantAccessToken({ appId, appSecret }) {
  const body = await requestJson(
    `${FEISHU_BASE_URL}/auth/v3/tenant_access_token/internal`,
    {
      method: "POST",
      headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        app_id: appId,
        app_secret: appSecret,
      }),
    },
  );

  return body.tenant_access_token;
}

async function sendTextMessage({ token, chatId, text }) {
  return requestJson(`${FEISHU_BASE_URL}/im/v1/messages?receive_id_type=chat_id`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      receive_id: chatId,
      msg_type: "text",
      content: JSON.stringify({ text }),
    }),
  });
}

async function main() {
  const dryRun = process.argv.includes("--dry-run");
  const inputPath = process.argv.find((arg, index) => {
    return index > 1 && arg !== "--dry-run";
  });

  if (!inputPath) {
    throw new Error(
      "Usage: node runtime/adapters/feishu/send-approval.mjs [--dry-run] data/approvals/pending/example.json",
    );
  }

  const approval = JSON.parse(await readFile(inputPath, "utf8"));
  const text = buildApprovalMessage({
    topic: approval.topic,
    reason: approval.reason,
    prepared: approval.prepared,
    recommendation: approval.recommendation,
    deadline: approval.deadline,
  });

  if (dryRun) {
    console.log(
      JSON.stringify(
        {
          sent: false,
          dry_run: true,
          approval_id: approval.id,
          text,
        },
        null,
        2,
      ),
    );
    return;
  }

  const config = requireFeishuConfig();
  const token = await getTenantAccessToken(config);
  const result = await sendTextMessage({
    token,
    chatId: config.approvalChatId,
    text,
  });

  console.log(
    JSON.stringify(
      {
        sent: true,
        approval_id: approval.id,
        chat_id: config.approvalChatId,
        message_id: result.data?.message_id ?? null,
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
