# 项目结构设计

> 日期：2026-06-07  
> 状态：生效草案  
> 目标：保证项目后期可以交付、部署、复制和持续升级。

## 1. 核心判断

本项目的长期形态不是一个普通页面，也不是一个单 Agent。

它应该是：

```text
AI 商业实验室操作系统
```

可交付能力包括：

- 每天观察现实世界和商业信号
- 将信号扩展成机会面
- 选择可验证的小实验
- 生成内容、话术、报价、交付模板
- 记录候选、反馈、转化和收入
- 复盘失败和成功
- 升级项目内核
- 在服务端持续运行

## 2. 四层结构

项目后期按四层理解：

```text
Kernel      稳定大脑
Workflows   可重复工作方式
Experiments 商业验证现场
Runtime     执行环境和界面
```

### 2.1 Kernel

Kernel 是最值钱、最可迁移的部分。

它包括：

- 原则
- 方法
- 技能
- 评分标准
- 协议
- 提示词
- 约束边界

运行时可以变化，Kernel 应尽量稳定。

### 2.2 Workflows

Workflows 定义“每天和每周怎么跑”。

典型流程：

```text
每日信号雷达
机会扩展
实验设计
现金流报价
候选搜集
人工批准
外部测试
复盘升级
```

### 2.3 Experiments

Experiments 是验证真假商业价值的现场。

每个实验必须回答：

- 买家是谁
- 为什么现在
- 交付什么
- 价格是多少
- 怎么找到候选
- 什么算成功
- 什么算失败
- 学到了什么

### 2.4 Runtime

Runtime 是把 Kernel 和 Workflows 真正跑起来的执行环境。

当前 Runtime：

```text
Codex + 本地文件 + Git
```

未来 Runtime：

```text
Web + API + Worker + Scheduler + DB/File + Git + LLM
```

## 3. 目标目录结构

```text
ai-life/
  README.md
  AGENTS.md

  product/
    README.md
    structure.md
    roadmap.md
    offers.md
    pricing.md
    target-users.md

  kernel/
    README.md
    principles/
    methods/
    skills/
    rubrics/
    protocols/
    prompts/

  workflows/
    README.md
    daily-radar/
    opportunity-expansion/
    experiment-design/
    validation/
    retrospective/

  experiments/
    README.md
    active/
    paused/
    archived/

  intelligence/
    README.md
    signals/
    sources/
    reports/
    policy/
    current-affairs/

  operations/
    channels/
    handoffs/
    compliance/
    logs/

  content/
    xiaohongshu/
    bilibili/
    wechat/

  apps/
    README.md
    web/
    api/
    worker/

  runtime/
    README.md
    architecture.md
    adapters/
    scheduler/

  deploy/
    README.md
    env.example
    docker-compose.yml

  data/
    README.md
    candidates/
    feedback/
    conversions/
    experiments/

  memory/
    changelog/
    decisions/
    retrospectives/
```

## 4. 当前目录兼容策略

当前仓库已有：

- `principles/`
- `methods/`
- `skills/`
- `rubrics/`
- `signals/`
- `sources/`
- `reports/`
- `runs/`
- `memory/kernel-changelog/`

这些内容先不立即搬迁，避免破坏已提交历史和上下文。

短期策略：

```text
新增内容进入新结构。
旧内容保持可读。
迁移时先写映射，再分批移动。
```

建议映射：

| 旧目录 | 未来位置 |
|---|---|
| `principles/` | `kernel/principles/` |
| `methods/` | `kernel/methods/` 或 `workflows/` |
| `skills/` | `kernel/skills/` |
| `rubrics/` | `kernel/rubrics/` |
| `signals/` | `intelligence/signals/` |
| `sources/` | `intelligence/sources/` |
| `reports/` | `intelligence/reports/` |
| `runs/` | `operations/logs/` 或 `memory/decisions/` |
| `memory/kernel-changelog/` | `memory/changelog/` |

## 5. 交付标准

一个后期可交付版本至少应具备：

- 清晰中文入口
- 可读项目结构
- 可运行服务端
- 可展示前端
- 可执行 Worker
- 可配置定时任务
- 可追踪实验数据
- 可回滚 Git 记录
- 明确人工批准边界

## 6. 下一步

不要立即大规模重构。

优先顺序：

```text
1. 固化结构和运行时文档
2. 建立 apps/runtime/deploy 骨架
3. 做最小中文展示页
4. 做最小 API 和 Worker
5. 再逐步迁移旧文档
```
