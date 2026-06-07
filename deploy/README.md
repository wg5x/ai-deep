# Deploy

本目录定义服务端部署方式。

## 当前状态

当前还没有真正的服务端程序，因此暂不提供可运行的 Docker Compose。

本阶段先定义目标启动方式。

## 未来目标

```bash
cp deploy/env.example .env
docker compose up -d
```

启动后：

- Web 在 `3000`
- API 在 `3001`
- Worker 后台运行
- Scheduler 定时触发任务

## 最小环境变量

见：

- `env.example`

## 部署原则

- 先单机部署
- 先文件 + SQLite
- 先人工批准外部动作
- 先跑通收入验证，再扩展复杂基础设施
