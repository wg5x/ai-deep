# 服务端运行时架构

> 日期：2026-06-07  
> 状态：生效草案  
> 目标：说明项目部署到服务端后如何启动、运行、记录和等待人工批准。

## 1. 什么是运行时

运行时不是项目大脑。

运行时是把项目大脑跑起来的身体。

```text
Kernel 负责判断
Workflows 负责步骤
Runtime 负责执行
Apps 负责展示和交互
Data 负责记录
```

## 2. 当前运行时

当前是本地协作运行时：

```text
Codex
+ 本地文件系统
+ Git
+ 人工批准边界
```

优点：

- 轻
- 快
- 易改
- 适合早期探索

缺点：

- 不能自动定时运行
- 没有 Web 展示
- 没有长期后台 Worker
- 不适合多人或服务端部署

## 3. 目标服务端运行时

目标结构：

```text
Browser
  ↓
apps/web
  ↓
apps/api
  ↓
apps/worker
  ↓
kernel + workflows + data + intelligence + experiments + memory
```

配套：

```text
runtime/scheduler 定时触发
runtime/adapters 适配不同大模型或 Agent 平台
deploy/ 负责启动方式
Git 负责版本记录和回滚
```

## 4. 服务端启动后发生什么

启动流程：

```text
1. 读取 .env 配置
2. 启动 API 服务
3. 启动 Web 服务
4. 启动 Worker
5. Scheduler 注册每日/每周任务
6. Worker 扫描 kernel 和 workflows
7. Worker 读取当前实验和情报源
8. 生成内部产出
9. 写入 data、intelligence、memory
10. 需要外部动作时，创建待批准项
```

## 5. 最小服务端组件

### 5.1 Web

职责：

- 展示项目状态
- 展示当前实验
- 展示每日信号
- 展示候选机会
- 展示待批准动作

### 5.2 API

职责：

- 提供项目状态接口
- 读取文件和结构化数据
- 写入反馈和转化记录
- 触发 Worker
- 管理人工批准队列

### 5.3 Worker

职责：

- 执行每日雷达
- 执行机会扩展
- 生成实验草案
- 生成报告
- 生成复盘
- 写入文件和数据

### 5.4 Scheduler

职责：

- 每日定时运行信号扫描
- 每周生成周报
- 定期检查待复盘实验

第一版可以用简单 cron 或 Node/Python 定时器。

### 5.5 Data

第一版建议：

```text
文件 + SQLite
```

原因：

- 简单
- 可读
- 易备份
- 易迁移
- 适合早期小团队

## 6. 人工批准边界

Worker 可以自动做：

- 搜集公开信息
- 生成内部报告
- 生成候选机会
- 生成触达话术草案
- 生成报价草案
- 更新内部复盘

Worker 不可以自动做：

- 发布公开内容
- 私信真实客户
- 联系商家
- 花钱
- 收款
- 承诺收益
- 做法律、医疗、金融等高风险承诺

外部动作必须进入：

```text
待批准队列
```

由用户批准后执行。

## 7. 启动方式草案

未来目标：

```bash
cp deploy/env.example .env
docker compose up -d
```

服务：

```text
web     http://server:3000
api     http://server:3001
worker  后台常驻
```

当前尚未实现 Docker Compose。本阶段只定义结构和约束。

## 8. 运行模式

### Manual

人工手动触发工作流。

适合当前阶段。

### Assisted

系统定时生成候选和草案，用户批准外部动作。

适合第一版服务端。

### Autonomous

系统自动运行大部分内部循环，但高风险动作仍需批准。

只有在有稳定收入和合规边界后再进入。

## 9. 失败和回滚

每次 Worker 运行必须记录：

- 输入
- 输出
- 来源
- 假设
- 决策
- 错误
- 下一步

重要变更应通过 Git 留痕。

如果实验方向错误：

```text
暂停实验
保留资产
写复盘
升级内核
转向新实验
```

## 10. 后续实现顺序

建议顺序：

```text
1. 静态 Web 展示页
2. 只读 API
3. 文件/SQLite 数据层
4. 手动触发 Worker
5. Scheduler
6. 待批准队列
7. Docker Compose
```
