# Run 012: 项目内可迁移 Skills 升级

> 日期：2026-06-07  
> 状态：已完成 v0.1  
> 背景：用户明确指出 skills 不应只存在于本机全局目录，未来运行环境会迁移到服务端。

## 1. 本次判断

AI 商业实验室的核心能力必须属于项目资产，而不是某个运行环境的私有配置。

因此 skills 应放在项目仓库内：

```text
skills/*/SKILL.md
```

未来无论运行在本机 Codex、服务端 Agent runtime，还是其他自动化系统，都可以复制、加载、版本管理和迭代这些技能。

## 2. 已完成动作

撤回了误放在全局目录的技能副本，只保留用户已有的全局 `find-skills`。

新增项目级技能：

- `skills/market-signal-radar/SKILL.md`
- `skills/venture-experiment-designer/SKILL.md`
- `skills/cashflow-offer-builder/SKILL.md`
- `skills/business-retrospective/SKILL.md`

新增项目级运行约定：

- `AGENTS.md`

更新使命文档：

- `mission/autonomous-venture-loop.md`

## 3. 能力变化

项目从“AI机会雷达”进一步升级为：

```text
AI 商业实验室：
观察现实世界，发现商业信号，设计大小实验，用 AI 降低执行成本，
用真实市场反馈验证能否持续产生现金流。
```

## 4. 关键原则

```text
技能属于项目内核，不属于本机全局环境。
运行时可以替换，项目内核必须可复制。
```

## 5. 下一步

下一轮应使用这些项目 skills 生成第一个现金流实验候选，例如：

```text
世界杯观赛消费窗口 → 北京本地商家 7 天获客服务包
```
