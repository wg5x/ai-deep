# 决策：ailife Hermes profile 暂不配置模型

> 日期：2026-06-07
> 状态：生效
> 决策来源：用户回复 `1`

## 背景

本机已经安装 Hermes Agent，并已创建 AI Life 专用 profile：

```text
profile: ailife
path: /Users/wgxxx/.hermes/profiles/ailife
```

该 profile 已隔离：

- 未配置 `.env`
- 未配置模型
- 未配置 Feishu
- 未启动 gateway
- 未创建 cron
- 未配置 MCP
- 未 seed bundled skills
- CLI toolsets 已全部禁用

## 选项

```text
1 不配置模型，先保留 ailife profile
2 使用本地模型
3 临时借用 default 的模型能力做一次测试
4 单独配置 ailife 模型/API key
```

## 判断

用户选择：

```text
1 不配置模型，先保留 ailife profile
```

当前不让 Hermes 成为执行者，只把它保留为未来 Runtime 候选。

## 风险

如果过早给 `ailife` 配置模型、gateway、cron 或 messaging，项目容易从现金流验证转向基础设施建设。

## 后续影响

- 短期继续由 Codex + 项目文件推进内部工作。
- Hermes `ailife` profile 仅作为隔离候选保留。
- 未经用户重新批准，不给 `ailife` 配置模型、密钥、通知通道、定时任务或外部工具。
- 如未来要启用 Hermes，必须重新进入 P0 确认。
