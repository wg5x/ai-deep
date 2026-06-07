# Apps Web

前端展示和操作台。

## 第一版目标

先做静态中文展示页，展示：

- 项目使命
- 当前实验
- 工作闭环
- 运行时状态
- 人工批准边界
- 中文化状态

当前入口：

```text
index.html
task-start.html
```

本地预览：

```bash
cd ai-life
python3 -m http.server 3000
```

访问：

```text
http://localhost:3000/apps/web/
http://localhost:3000/apps/web/task-start.html
```

## 后续目标

升级为轻量操作台：

- 查看每日信号
- 查看实验状态
- 查看候选商家
- 查看待批准动作
- 查看收入和反馈
- 通过任务启动台生成结构化启动单

## 不做

第一版不做复杂后台、不做登录系统、不做支付系统，不真实触发飞书或机器人。
