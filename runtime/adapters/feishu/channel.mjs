export function extractFeishuReply(eventBody) {
  const message = eventBody?.event?.message;
  const sender = eventBody?.event?.sender?.sender_id;
  let content = {};

  try {
    content = JSON.parse(message?.content ?? "{}");
  } catch {
    content = {};
  }

  return {
    chat_id: message?.chat_id ?? null,
    message_id: message?.message_id ?? null,
    open_id: sender?.open_id ?? null,
    text: String(content.text ?? "").trim(),
  };
}

export function requireFeishuConfig(env = process.env) {
  const required = [
    "FEISHU_APP_ID",
    "FEISHU_APP_SECRET",
    "FEISHU_APPROVAL_CHAT_ID",
  ];
  const missing = required.filter((key) => !env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required Feishu environment values: ${missing.join(", ")}`,
    );
  }

  return {
    appId: env.FEISHU_APP_ID,
    appSecret: env.FEISHU_APP_SECRET,
    approvalChatId: env.FEISHU_APPROVAL_CHAT_ID,
    callbackPort: Number(env.FEISHU_CALLBACK_PORT ?? 3002),
  };
}
