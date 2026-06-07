#!/usr/bin/env node

import { createServer } from "node:http";
import { join } from "node:path";

import { saveApprovalDecision } from "../../approvals/store.mjs";
import {
  extractFeishuReply,
  requireFeishuConfig,
} from "./channel.mjs";

const approvalsDir = process.env.APPROVALS_DIR ?? join("data", "approvals");

function readRequestBody(request) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    request.on("data", (chunk) => chunks.push(chunk));
    request.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    request.on("error", reject);
  });
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "content-type": "application/json; charset=utf-8",
  });
  response.end(JSON.stringify(payload));
}

async function handleCallback(request, response) {
  if (request.method !== "POST") {
    sendJson(response, 405, { error: "method_not_allowed" });
    return;
  }

  const rawBody = await readRequestBody(request);
  const body = JSON.parse(rawBody || "{}");

  if (body.challenge) {
    sendJson(response, 200, { challenge: body.challenge });
    return;
  }

  if (body.header?.event_type !== "im.message.receive_v1") {
    sendJson(response, 200, { ignored: true });
    return;
  }

  const reply = extractFeishuReply(body);

  if (!reply.text) {
    sendJson(response, 200, { ignored: true, reason: "empty_text" });
    return;
  }

  const approvalId = process.env.FEISHU_ACTIVE_APPROVAL_ID ?? reply.message_id;
  const recordPath = await saveApprovalDecision({
    approvalsDir,
    approval: {
      id: approvalId,
      level: "P0",
      topic: process.env.FEISHU_ACTIVE_APPROVAL_TOPIC ?? "飞书回复确认",
      recommended_action:
        process.env.FEISHU_ACTIVE_RECOMMENDED_ACTION ?? "按用户回复继续",
      source_file: process.env.FEISHU_ACTIVE_SOURCE_FILE,
      notes: `feishu_chat_id=${reply.chat_id}; feishu_open_id=${reply.open_id}; feishu_message_id=${reply.message_id}`,
    },
    replyText: reply.text,
    channel: "feishu",
  });

  sendJson(response, 200, { saved: true, record_path: recordPath });
}

function main() {
  const config = requireFeishuConfig();
  const server = createServer((request, response) => {
    handleCallback(request, response).catch((error) => {
      sendJson(response, 500, { error: error.message });
    });
  });

  server.listen(config.callbackPort, () => {
    console.log(`Feishu callback server listening on :${config.callbackPort}`);
  });
}

main();
