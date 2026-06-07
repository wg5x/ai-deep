# 飞书确认桥实机试通清单

> 日期：2026-06-07
> 目标：把 AI Life 的 P0 待确认事项同步到飞书，并把用户回复记录回 `data/approvals/resolved/`。
> 原则：只做内部确认，不自动发布、不私信客户、不收款、不花钱。

## 1. 试通范围

本次只验证：

```text
本地生成确认问题
→ 飞书机器人发送给用户
→ 用户在飞书回复 1/2/3/4/5
→ 回调服务记录确认结果
```

本次不做：

- 卡片按钮审批
- 多人审批
- 自动发布公开内容
- 自动联系真实客户
- 自动收款或报价承诺
- 读取群聊全部消息

## 2. 飞书后台配置

在飞书开放平台创建企业自建应用。

需要配置：

```text
应用能力：机器人
凭证：App ID、App Secret
事件订阅：接收消息 v2.0
事件类型：im.message.receive_v1
```

建议只申请第一版需要的权限：

```text
以应用的身份发消息
读取用户发给机器人的单聊消息
接收群聊中 @ 机器人消息事件
```

暂不建议申请：

```text
获取群组中所有消息
获取用户敏感字段
通讯录大范围读取
```

## 3. 本地预览

不需要飞书密钥，先确认消息格式：

```bash
node runtime/adapters/feishu/send-approval.mjs \
  --dry-run \
  data/approvals/pending/example-feishu-approval.json
```

预期看到：

```json
{
  "sent": false,
  "dry_run": true,
  "approval_id": "approval-example-001",
  "text": "【需要你确认】..."
}
```

## 4. 环境变量

复制 `deploy/env.example` 中的飞书配置到本地 `.env` 或当前 shell：

```bash
export FEISHU_APP_ID=cli_xxx
export FEISHU_APP_SECRET=xxx
export FEISHU_APPROVAL_CHAT_ID=oc_xxx
export FEISHU_CALLBACK_PORT=3002
export APPROVALS_DIR=./data/approvals
```

第一版回调匹配仍是手动指定当前审批项：

```bash
export FEISHU_ACTIVE_APPROVAL_ID=approval-example-001
export FEISHU_ACTIVE_APPROVAL_TOPIC=是否联系候选商家
export FEISHU_ACTIVE_RECOMMENDED_ACTION=先联系 1 家低风险候选
export FEISHU_ACTIVE_SOURCE_FILE=data/approvals/pending/example-feishu-approval.json
```

后期再升级为：

```text
发送时记录 approval_id ↔ feishu_message_id
回调时自动匹配原审批项
```

## 5. 发送飞书确认消息

```bash
node runtime/adapters/feishu/send-approval.mjs \
  data/approvals/pending/example-feishu-approval.json
```

如果成功，会输出：

```json
{
  "sent": true,
  "approval_id": "approval-example-001",
  "chat_id": "oc_xxx",
  "message_id": "om_xxx"
}
```

## 6. 启动回调服务

```bash
node runtime/adapters/feishu/callback-server.mjs
```

本地回调端口：

```text
http://localhost:3002
```

飞书事件订阅需要公网地址。可以临时使用 Cloudflare Tunnel、ngrok 或服务器反向代理，把公网 HTTPS 转到本地 `3002`。

## 7. 飞书事件订阅地址

飞书后台事件订阅地址填写公网地址，例如：

```text
https://your-domain.example/feishu/callback
```

当前服务会接受任意路径的 `POST`，因此 `/` 或 `/feishu/callback` 都可以。

飞书首次配置会发送 challenge，本服务会返回：

```json
{
  "challenge": "..."
}
```

## 8. 用户回复

在飞书里回复：

```text
1
```

或：

```text
同意，继续
```

预期项目生成：

```text
data/approvals/resolved/YYYY-MM-DD-approval-example-001.json
```

记录里应包含：

```text
decision: approved
channel: feishu
next_action: 执行该动作，并记录批准来源和时间
```

## 9. 验证命令

```bash
node --test runtime/approvals/approvals.test.mjs \
  runtime/adapters/feishu/channel.test.mjs \
  runtime/adapters/feishu/send-approval.test.mjs

node --check runtime/adapters/feishu/send-approval.mjs
node --check runtime/adapters/feishu/callback-server.mjs
```

## 10. 风险和后续升级

当前第一版仍有三个限制：

- 没有飞书 Encrypt Key/签名校验，不适合长期公网裸跑。
- 没有自动关联 `approval_id` 和 `feishu_message_id`，并发审批时需要升级。
- 没有幂等去重，重复回调可能产生重复记录。

升级顺序建议：

```text
1. 先实机试通单条确认
2. 再做签名/Encrypt Key 校验
3. 再做 message_id ↔ approval_id 关联
4. 最后再考虑按钮、Web 审批台、多通道
```

## 11. 官方文档入口

- 自建应用获取 `tenant_access_token`：https://open.feishu.cn/document/server-docs/authentication-management/access-token/tenant_access_token_internal?lang=zh-CN
- 发送消息接口：https://open.feishu.cn/document/server-docs/im-v1/message/create?lang=zh-CN
- 接收消息事件：https://open.feishu.cn/document/server-docs/im-v1/message/events/receive?lang=zh-CN
