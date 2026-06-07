import assert from "node:assert/strict";
import test from "node:test";

import { extractFeishuReply, requireFeishuConfig } from "./channel.mjs";

test("extractFeishuReply reads plain text from a Feishu message event", () => {
  const reply = extractFeishuReply({
    schema: "2.0",
    header: { event_type: "im.message.receive_v1" },
    event: {
      message: {
        chat_id: "oc_123",
        message_id: "om_123",
        content: "{\"text\":\"1 批准，继续\"}",
      },
      sender: {
        sender_id: {
          open_id: "ou_user",
        },
      },
    },
  });

  assert.deepEqual(reply, {
    chat_id: "oc_123",
    message_id: "om_123",
    open_id: "ou_user",
    text: "1 批准，继续",
  });
});

test("requireFeishuConfig reports missing required environment values", () => {
  assert.throws(
    () => requireFeishuConfig({ FEISHU_APP_ID: "cli_xxx" }),
    /Missing required Feishu environment values: FEISHU_APP_SECRET, FEISHU_APPROVAL_CHAT_ID/,
  );

  assert.deepEqual(
    requireFeishuConfig({
      FEISHU_APP_ID: "cli_xxx",
      FEISHU_APP_SECRET: "secret",
      FEISHU_APPROVAL_CHAT_ID: "oc_xxx",
      FEISHU_CALLBACK_PORT: "3002",
    }),
    {
      appId: "cli_xxx",
      appSecret: "secret",
      approvalChatId: "oc_xxx",
      callbackPort: 3002,
    },
  );
});
