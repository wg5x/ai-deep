# Runtime Adapters

本目录用于适配不同 Agent 或大模型运行环境。

## 目标

项目不绑定单一运行时。

未来可适配：

- Codex
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
