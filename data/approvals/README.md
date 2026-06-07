# Approvals

本目录记录需要用户确认的 P0 决策。

建议结构：

```text
data/approvals/
  pending/       待发送或待回复的确认事项
  resolved/      已收到回复的确认记录
  events/        原始通道事件，供排错和审计使用
```

确认记录由 `runtime/approvals/store.mjs` 写入。飞书、企业微信、Web 控制台等通道只负责把用户回复转换成文本并调用通用存储。

已确认记录包含：

```text
date
notification_id
level
topic
recommended_action
user_reply
decision
next_action
source_file
notes
```
