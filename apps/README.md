# Apps

Apps 是项目的产品界面和服务程序层。

## 目录

- `web/`：前端展示和操作台
- `api/`：后端 API
- `worker/`：Agent Worker

## 原则

Apps 不应该承载项目大脑。

Apps 只负责：

- 展示状态
- 调用工作流
- 读取数据
- 提供人工批准入口
- 触发 Worker

真正的判断和规则应放在 `kernel/` 与 `workflows/`。
