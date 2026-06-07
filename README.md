# AI Life / AI 商业实验室

> 状态：早期内核与实验系统  
> 默认语言：中文  
> 核心目标：用 AI 持续帮助用户发现、验证并放大可赚钱机会。

## 1. 项目是什么

AI Life 不是一个普通报告项目，也不是单纯的前端网站。

它的长期形态是：

```text
AI 商业实验室操作系统
```

它要做的事：

```text
观察现实世界
→ 发现商业信号
→ 扩展机会面
→ 设计小实验
→ 用 AI 降低执行成本
→ 获取真实反馈和收入
→ 复盘并升级项目内核
```

## 2. 当前运行方式

当前运行时是：

```text
Codex + 本地文件系统 + Git + 人工批准边界
```

也就是说，现在主要由 Agent 读取项目文档、生成实验资产、记录复盘，并通过 Git 留痕。

## 3. 未来服务端运行方式

未来服务端运行时会演进为：

```text
Web 前端
+ API 后端
+ Agent Worker
+ Scheduler 定时任务
+ 文件/SQLite 存储
+ Git 版本记录
+ 大模型 API
```

详细设计见：

- `product/structure.md`
- `runtime/architecture.md`
- `deploy/README.md`
- `deploy/startup.md`

## 4. 核心原则

项目必须长期服从：

```text
简单
持久
挣钱
借力
小船好掉头
```

未经用户明确批准，不执行：

- 发布公开内容
- 联系真实客户
- 花钱
- 收款
- 承诺收益
- 高风险平台操作

## 5. 当前重点

当前优先实验：

```text
experiments/004-gaokao-post-exam-local-consumption-pack/
```

目标：

```text
验证北京本地商家是否愿意为高考后/录取季营销包支付 499/999 元。
```

## 6. 目录入口

- `product/`：产品定义、路线图、交付结构
- `kernel/`：项目大脑，原则、技能、方法、协议
- `workflows/`：可重复执行的工作流
- `experiments/`：商业实验
- `intelligence/`：情报、信号、来源、报告
- `operations/`：运营、渠道、交接、合规边界
- `content/`：小红书、B站、微信等内容资产
- `apps/`：前端、后端、Worker 应用
- `runtime/`：运行时适配、定时任务、Agent 执行约定
- `deploy/`：部署说明
- `data/`：结构化候选、反馈、转化数据
- `memory/`：决策、复盘、内核升级记录

## 7. 重要说明

当前仓库已经中文优先，但早期文档仍有英文残留。后续应按 `product/structure.md` 逐步迁移，不一次性重构。
