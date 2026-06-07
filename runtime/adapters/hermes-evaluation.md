# Hermes Runtime 适配评估

> 日期：2026-06-07
> 状态：只读评估完成
> 结论：Hermes 值得作为 AI Life 的 Runtime 候选，但当前不直接接管项目、不自动发消息、不自动执行外部动作。

## 1. 核心判断

Hermes 不是单纯通知工具。

它更接近：

```text
持久运行的 Agent Runtime
+ Messaging Gateway
+ Cron Scheduler
+ Skills
+ Memory
+ MCP
+ Profiles
```

这和 AI Life 的长期目标有重合：

```text
Kernel      稳定大脑
Workflows   可重复工作方式
Experiments 商业验证现场
Runtime     执行环境和界面
```

因此，Hermes 可以作为 Runtime 候选，但不能替代项目 Kernel。

## 2. 本机事实

本机只读检查结果：

```text
command: /Users/wgxxx/.local/bin/hermes
target:  /Users/wgxxx/.hermes/hermes-agent/venv/bin/hermes
version: Hermes Agent v0.16.0 (2026.6.5)
project: /Users/wgxxx/.hermes/hermes-agent
gateway: running via launchd
cron: 1 active job
memory: built-in only, no external provider active
MCP: no servers configured
Feishu: configured in Hermes status
```

本次没有读取：

- `~/.hermes/.env`
- `~/.hermes/config.yaml`
- 具体群 ID
- 账号 token
- 密钥

本次没有执行：

- `hermes send`
- `hermes gateway setup`
- `hermes gateway start`
- `hermes cron create`
- 任何真实通知或外部动作

## 3. Hermes 适合解决什么

Hermes 适合承接：

- 长期后台运行
- 定时任务
- 多通道消息入口
- 技能管理
- 内建记忆
- 多 profile 隔离
- MCP 工具连接
- 一次性命令和脚本化运行

对应 AI Life 的未来能力：

```text
每天/每周自动跑内部任务
→ 生成 P1 阶段反馈
→ 遇到 P0 通过通道请求确认
→ 用户回复后继续推进
```

## 4. Hermes 不应解决什么

Hermes 不应承载：

- 商业方向判断
- 现金流机会筛选原则
- 是否触达真实客户的批准权
- 是否花钱、收款、发布、承诺的权限
- 项目长期内核

这些仍然属于：

```text
AGENTS.md
principles/
skills/
workflows/
experiments/
operations/
runtime/notifications/protocol.md
```

换句话说：

```text
Hermes 可以当身体。
AI Life 的大脑仍在本仓库。
```

## 5. 风险

我看到一个风险：

为什么这是风险：

Hermes 已经安装、gateway 正在运行、Feishu 已配置，这会让人很容易直接进入“接上就用”。但如果没有先定义边界，通知、定时任务和 Agent 自主行为可能绕过 AI Life 的 P0 确认协议。

更稳的替代方案：

先把 Hermes 作为隔离 Runtime 候选，只允许它读项目公开文档和生成内部草稿。所有 `send`、`cron create`、`gateway setup`、账号绑定、MCP 外部工具连接，都必须单独 P0 确认。

需要你判断的地方：

是否允许创建一个专门的 AI Life Hermes profile，用来做只读/内部任务试验。

## 6. 当前适配判断

| 项目需求 | Hermes 能力 | 当前判断 |
|---|---|---|
| 静默内部推进 | Agent CLI / oneshot / skills | 值得试 |
| 阶段反馈 | cron + send | 先不自动发送 |
| 主动通知 | gateway + Feishu | 已有能力，但需授权 |
| 用户回复 | gateway conversation | 待评估，不作为第一步 |
| 项目内核读取 | AGENTS.md / files | 可试，只读优先 |
| 权限边界 | Hermes 自身不懂 AI Life 边界 | 必须由本项目约束 |
| 多运行时隔离 | profile | 推荐使用 |
| 外部工具扩展 | MCP | 当前不接 |

## 7. 只读试验结果

### 7.1 执行方式

先做运行链路测试：

```bash
hermes chat -Q --max-turns 1 --toolsets "" -q "只做运行链路测试..."
```

再做一次只读项目理解测试：

```bash
hermes chat -Q --max-turns 1 --toolsets "" --source ai-life-readonly-eval -q "请只基于当前目录自动加载的项目规则..."
```

限制：

- `--max-turns 1`
- `--toolsets ""`
- 不使用 `--yolo`
- 不使用 `hermes send`
- 不创建 cron
- 不读取 Hermes 密钥或配置文件
- 不修改项目文件

### 7.2 结果

Hermes 返回内容能正确识别：

- AI Life 的核心目标是用 AI 持续帮助用户产生现金流
- 项目必须服从 `选择优先、简单、持久、挣钱`
- 动手前需要判断 `做不做 / 现在做不做 / 自己来还是借力 / 能否先人工验证 / 是否更接近现金流`
- 未验证前不做重投入，优先借开源、平台、渠道、第三方工具和 AI 自动化
- L0/L1/L2 可以静默推进
- L3/L4 必须等用户确认
- 花钱、发布、联系真实客户、收款、使用真实身份、人脉关系和高风险承诺必须 P0

Hermes 给出的下一步内部动作是：

```text
1. 用强脑暴 + 机会扩展引擎扩展 1→10→100→3→1 素材库
2. 整理旧目录到新结构的迁移清单，但不贸然搬迁
3. 复盘近期现金流实验，沉淀到 business-retrospective 模板
```

这些建议符合项目边界，且没有触发外部动作。

### 7.3 评估

当前评价：

```text
Hermes 可以理解 AI Life 的核心边界。
Hermes 适合作为未来 Runtime 候选。
Hermes 仍不应直接成为默认执行者。
```

原因：

- 本机 Hermes 默认 CLI 工具集中启用了 `terminal`、`file`、`cronjob`、`messaging` 等能力。
- `hermes chat` 在收窄工具和单轮限制后表现可控。
- 如果不隔离 profile 或不限制工具，仍可能扩大运行边界。

## 8. AI Life Profile 创建结果

### 8.1 已创建

已创建 profile：

```text
name: ailife
path: /Users/wgxxx/.hermes/profiles/ailife
alias: none
skills: 0
.env: not configured
gateway: stopped
cron jobs: 0
Feishu: not configured
model: not set
```

创建方式：

```bash
hermes profile create ailife --no-skills --no-alias --description "AI Life read-only runtime candidate..."
```

没有使用：

- `--clone`
- `--clone-all`
- default profile 的 `.env`
- default profile 的 Feishu 配置
- default profile 的 cron job
- default profile 的 gateway

### 8.2 工具权限

`ailife` profile 的 CLI toolsets 已全部禁用：

```text
web
browser
terminal
file
code_execution
vision
image_gen
tts
skills
todo
memory
session_search
clarify
delegation
cronjob
messaging
computer_use
```

这让 `ailife` 当前只能作为极保守的文本运行候选。

### 8.3 Profile 自身边界

`ailife` profile 的 `SOUL.md` 已写入边界：

```text
Choice before effort.
Borrow leverage before building.
External action requires explicit user confirmation.
Do not send messages.
Do not create scheduled jobs.
Do not start or configure gateways.
Do not read secrets.
Do not modify files unless explicitly asked.
```

### 8.4 Smoke Test

执行：

```bash
hermes -p ailife chat -Q --max-turns 1 --toolsets "" --source ai-life-profile-smoke -q "..."
```

结果：

```text
No inference provider configured.
```

判断：

```text
这是符合预期的隔离结果。
ailife 没有继承 default profile 的模型、密钥或账号。
```

## 9. 推荐下一步

### Step 1：选择是否给 ailife 配置推理模型

当前 `ailife` profile 已隔离，但还不能真正运行。

下一步不是接飞书，也不是创建 cron，而是选择模型来源：

```text
1 继续不配置模型，只保留 ailife profile
2 使用本机/本地模型，不放云端密钥
3 使用已有 Hermes default 的模型能力，但不复制密钥，单次命令临时指定
4 单独给 ailife 配置一个低风险模型/API key
```

当前推荐：

```text
1 继续不配置模型，只保留 ailife profile
```

原因：

- Codex 当前已经能推进内部工作。
- Hermes 作为运行时候选已经完成隔离准备。
- 在没有明确自动运行需求前，不需要急着配置模型。

### Step 2：如果以后需要运行

如果未来要让 `ailife` profile 真正运行，要求：

- 不接新账号
- 不发送消息
- 不创建 cron
- 不配置 MCP
- 不改变默认 Hermes profile

通过标准：

- 能读取本项目 `AGENTS.md`
- 能识别 `选择优先`、`借力与小船`、`P0 确认`边界
- 能生成一份内部 P1 阶段反馈草稿
- 不执行任何外部动作

### Step 3：一次性 oneshot 试验

目标：

```text
让 Hermes 在当前仓库内只读生成一份“今日内部推进建议”。
```

限制：

- 不启用 `--yolo`
- 不使用 `hermes send`
- 不允许改文件，除非用户另行批准
- 输出只回到终端或 Codex 线程

### Step 4：人工评估输出质量

判断：

- 是否比当前 Codex 流程更适合长期运行
- 是否更能减少用户盯屏
- 是否尊重项目边界
- 是否会把项目带向基础设施复杂化

## 10. 暂不做

当前不做：

- 用 Hermes 自动发飞书
- 用 Hermes 自动创建 cron
- 用 Hermes 接管 AI Life 项目
- 配置微信/飞书/企业微信新通道
- 添加外部 MCP
- 迁移项目技能到 Hermes skills
- 把用户密钥写入本仓库

## 11. 建议授权

用户已选择：

```text
1 不配置模型，先保留 ailife profile
```

当前决策：

```text
ailife profile 保持隔离空 profile。
不配置模型。
不接账号。
不发送消息。
不创建 cron。
不配置 MCP。
```

决策记录见：

- `memory/decisions/2026-06-07-hermes-ailife-profile-model.md`

后续如需启用 Hermes，再重新判断：

```text
是否给 ailife profile 配置推理模型。
```

不包含：

```text
发送消息
创建定时任务
接入账号
读取密钥
发布内容
触达客户
花钱
```

可选回复：

```text
1 不配置模型，先保留 ailife profile
2 使用本地模型
3 临时借用 default 的模型能力做一次测试
4 单独配置 ailife 模型/API key
```

## 12. 参考

- [Hermes Agent GitHub](https://github.com/NousResearch/hermes-agent)
- [Hermes Features](https://hermes-ai.net/docs/features/)
