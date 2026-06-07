# Runtime Adapters

本目录用于适配不同 Agent 或大模型运行环境。

## 目标

项目不绑定单一运行时。

未来可适配：

- Codex
- Hermes Agent
- OpenAI API
- 其他 Agent 框架
- 自研 Worker
- MCP 工具

## 原则

Adapter 只负责连接外部能力，不承载商业判断。

商业判断放在：

```text
kernel/
workflows/
experiments/
```

## Hermes

Hermes 当前作为运行时候选，不作为项目内核。

评估见：

- `hermes-evaluation.md`

在用户明确批准前，不得用 Hermes 执行：

- 发送消息
- 创建定时任务
- 接入新账号
- 读取密钥
- 发布内容
- 触达客户
- 花钱或收款
