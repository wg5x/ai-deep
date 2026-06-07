# 飞书确认桥

> 状态：最小可运行草案
> 目标：把 AI Life 的 P0 待确认事项同步到飞书，并把用户回复记录到项目文件。

## 作用

```text
AI Life 生成待确认事项
→ 飞书机器人发给用户
→ 用户回复 1/2/3/4/5 或简短自然语言
→ 回调服务记录决策
→ 后续 Worker/Codex 读取记录继续
```

第一版只做内部确认，不自动执行外部动作。

## 文件

- `channel.mjs`：飞书事件解析和飞书环境变量校验。
- `send-approval.mjs`：读取待确认 JSON，发送到飞书群或单聊。
- `callback-server.mjs`：接收飞书事件回调，调用通用审批存储记录用户回复。
- `channel.test.mjs`：飞书通道测试。

通用审批协议和存储位于：

```text
runtime/approvals/
```

## 环境变量

```bash
FEISHU_APP_ID=cli_xxx
FEISHU_APP_SECRET=xxx
FEISHU_APPROVAL_CHAT_ID=oc_xxx
FEISHU_CALLBACK_PORT=3002
APPROVALS_DIR=data/approvals
```

可选变量：

```bash
FEISHU_ACTIVE_APPROVAL_ID=approval-001
FEISHU_ACTIVE_APPROVAL_TOPIC=是否继续触达候选商家
FEISHU_ACTIVE_RECOMMENDED_ACTION=批准后只触达 1 个低风险候选
FEISHU_ACTIVE_SOURCE_FILE=experiments/example.md
```

## 待确认输入样例

```json
{
  "id": "approval-001",
  "topic": "是否联系候选商家",
  "reason": "准备触达真实商家，属于外部动作",
  "prepared": "已整理候选名单和话术草案",
  "recommendation": "先联系 1 家低风险候选",
  "deadline": "2026-06-08 18:00"
}
```

## 发送确认消息

本地预览，不需要飞书密钥：

```bash
node runtime/adapters/feishu/send-approval.mjs --dry-run data/approvals/pending/approval-001.json
```

实发到飞书：

```bash
node runtime/adapters/feishu/send-approval.mjs data/approvals/pending/approval-001.json
```

## 启动回调服务

```bash
node runtime/adapters/feishu/callback-server.mjs
```

飞书开放平台事件订阅地址填写：

```text
https://你的公网域名/ 或 https://你的公网域名/feishu/callback
```

如果本地测试，可以用 ngrok、Cloudflare Tunnel 等临时暴露 `FEISHU_CALLBACK_PORT`。

## 用户回复协议

```text
1 批准
2 暂停
3 给我更多信息
4 换方向
5 晚点再说
```

自然语言会做很轻的映射，例如“同意，继续”映射为批准；无法判断时记录为 `unclear`，后续必须再次确认。

回复协议由 `runtime/approvals/protocol.mjs` 维护，飞书通道不单独定义业务判断。

## 安全边界

- 本适配器只记录确认，不自动发布、私信、收款或花钱。
- 第一版未实现飞书 Encrypt Key/签名校验，不建议直接暴露到生产公网长期运行。
- 生产使用前应补充飞书事件加密/签名校验，并限制回调来源。

实机试通步骤见：

- `operations/feishu-approval-setup-checklist.md`
