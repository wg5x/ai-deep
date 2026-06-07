# Runtime

Runtime 是项目的执行环境。

## 定义

```text
项目内核 = 文档、原则、技能、流程、实验模板
运行时 = 负责读取内核并执行工作流的程序环境
```

当前运行时：

```text
Codex + 本地文件系统 + Git
```

未来运行时：

```text
Web + API + Worker + Scheduler + 数据存储 + Git + LLM
```

详细说明见：

- `architecture.md`
- `adapters/hermes-evaluation.md`

## 通知与确认

自主运行前必须先建立异步沟通规则。

当前通知协议见：

- `notifications/protocol.md`
- `notifications/channel-leverage-evaluation.md`

核心原则：

```text
AI 静默执行低风险内部任务。
需要用户授权或判断时，再通过通知通道请求确认。
```

当前第一版不自研接入。先用 Codex 线程和人工转发验证通知协议；只有通道价值被证明后，才评估 Apprise、飞书自定义机器人、ntfy、PushDeer 等借力方案。
