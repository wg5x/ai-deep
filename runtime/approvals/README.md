# Runtime Approvals

> 目标：提供通道无关的人工确认核心，让飞书、企业微信、Web 控制台等通道都复用同一套协议和记录结构。

## 边界

本目录负责：

- P0/P1 确认消息格式
- 用户回复到决策状态的映射
- 确认记录落盘
- `pending/resolved/events` 数据结构约定

本目录不负责：

- 调飞书、微信、邮件等外部 API
- 决定是否联系客户、发布内容、花钱或收款
- 执行业务动作

## 文件

- `protocol.mjs`：确认消息格式和 `1-5` 回复协议。
- `store.mjs`：把确认结果写入 `data/approvals/resolved/`。
- `approvals.test.mjs`：通用审批核心测试。

## 数据结构

```text
data/approvals/
  pending/       待发送或待回复的确认事项
  resolved/      已收到回复并归档的确认记录
  events/        原始通道事件，供排错和审计使用
```

## 扩展方式

新增通道时，只在 `runtime/adapters/<channel>/` 内实现：

```text
发送消息
接收事件
把通道事件转换成用户回复文本
调用 runtime/approvals/store.mjs 记录结果
```
