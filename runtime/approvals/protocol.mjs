export const REPLY_MAP = {
  "1": {
    decision: "approved",
    reply_code: "1",
    reply_label: "批准",
    next_action: "执行该动作，并记录批准来源和时间",
  },
  "2": {
    decision: "paused",
    reply_code: "2",
    reply_label: "暂停",
    next_action: "暂停该动作，保留资产，必要时写入复盘",
  },
  "3": {
    decision: "needs_more_info",
    reply_code: "3",
    reply_label: "给我更多信息",
    next_action: "补充依据、风险、候选、样例或替代方案",
  },
  "4": {
    decision: "change_direction",
    reply_code: "4",
    reply_label: "换方向",
    next_action: "停止当前动作，重新做机会扩展或换实验",
  },
  "5": {
    decision: "defer",
    reply_code: "5",
    reply_label: "晚点再说",
    next_action: "不执行该动作，记录为待提醒",
  },
};

const NATURAL_LANGUAGE_HINTS = [
  [/^(同意|批准|可以|继续|ok|OK|好|行)/, "1"],
  [/^(暂停|先停|不要|别发|不做)/, "2"],
  [/^(更多|补充|说明|依据|为什么)/, "3"],
  [/^(换方向|换一个|重来|改方向)/, "4"],
  [/^(晚点|稍后|过会|明天|之后)/, "5"],
];

export function buildApprovalMessage({
  topic,
  reason,
  prepared,
  recommendation,
  deadline,
}) {
  const deadlineLine = deadline ? `窗口截止时间：${deadline}\n超时默认动作：不执行\n` : "";

  return [
    "【需要你确认】",
    `事项：${topic}`,
    `为什么找你：${reason}`,
    `我已经准备好：${prepared}`,
    `建议选择：${recommendation}`,
    deadlineLine.trimEnd(),
    "你可以回复：",
    "1 批准",
    "2 暂停",
    "3 给我更多信息",
    "4 换方向",
    "5 晚点再说",
  ]
    .filter(Boolean)
    .join("\n");
}

export function mapUserReply(replyText) {
  const normalized = String(replyText ?? "").trim();
  const numericCode = normalized.match(/^[1-5]/)?.[0];
  const hintedCode =
    numericCode ??
    NATURAL_LANGUAGE_HINTS.find(([pattern]) => pattern.test(normalized))?.[1];
  const mapped = hintedCode ? REPLY_MAP[hintedCode] : null;

  if (!mapped) {
    return {
      decision: "unclear",
      reply_code: null,
      reply_label: "无法判断",
    };
  }

  return {
    decision: mapped.decision,
    reply_code: mapped.reply_code,
    reply_label: mapped.reply_label,
  };
}
