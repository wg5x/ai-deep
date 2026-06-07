# 服务端启动说明

> 日期：2026-06-07  
> 状态：启动设计说明  
> 说明：当前仓库还没有真实 Web/API/Worker 程序，本文件定义逐阶段启动方式。

## 1. 当前阶段：文档内核运行

当前项目没有服务端进程。

当前运行方式是：

```text
Codex / Agent 读取项目文档
→ 执行内部工作流
→ 写入文件
→ Git 记录变更
```

当前启动动作：

```bash
cd ai-life
```

然后由 Agent 或人工读取：

- `README.md`
- `AGENTS.md`
- `product/structure.md`
- `runtime/architecture.md`
- `experiments/`

## 2. Phase 1：静态展示页

当 `apps/web` 里有静态页面后，可以用任意静态文件服务器启动。

示例：

```bash
cd ai-life
python3 -m http.server 3000
```

访问：

```text
http://server-ip:3000/apps/web/
```

该阶段只有展示，不执行 Agent。

## 3. Phase 2：Web + API

当 `apps/api` 实现后，目标启动方式：

```bash
cd apps/api
API_PORT=3001 npm run dev
```

Web 读取 API：

```bash
cd apps/web
WEB_PORT=3000 npm run dev
```

访问：

```text
Web: http://server-ip:3000
API: http://server-ip:3001
```

## 4. Phase 3：Worker

当 `apps/worker` 实现后，目标启动方式：

```bash
cd apps/worker
npm run worker
```

Worker 负责：

- 读取 `kernel/` 和 `workflows/`
- 执行内部任务
- 写入 `data/`
- 写入 `intelligence/`
- 写入 `memory/`
- 生成待批准动作

## 5. Phase 4：Docker Compose

当 Web、API、Worker 都具备最小实现后，目标启动方式：

```bash
cp deploy/env.example .env
docker compose up -d
```

目标服务：

```text
web     3000
api     3001
worker  background
```

## 6. 人工批准机制

无论运行到哪个阶段，以下动作都不能自动执行：

- 发布公开内容
- 联系真实客户
- 私信商家
- 花钱
- 收款
- 承诺收益

这些动作必须进入待批准队列。

## 7. 最小可交付判断

服务端部署第一版完成的标准：

```text
1. Web 能展示项目状态
2. API 能返回当前实验和信号
3. Worker 能手动生成一次内部报告
4. 所有外部动作都需要人工批准
5. 数据能落到 data/ 或 SQLite
6. 关键变更能通过 Git 留痕
```
