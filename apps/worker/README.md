# Apps Worker

Agent Worker 是服务端真正执行工作流的后台程序。

## 第一版职责

- 运行每日信号雷达
- 生成机会扩展
- 更新实验草案
- 生成报告和复盘
- 写入 `data/`、`intelligence/`、`memory/`

## 输入

- `kernel/`
- `workflows/`
- `experiments/`
- `intelligence/sources/`
- `.env`

## 输出

- 新信号
- 新机会
- 实验草案
- 候选列表
- 复盘记录
- 待批准动作

## 边界

Worker 可以准备外部动作，但不能自动执行高风险动作。

```text
准备触达话术：可以
自动私信商家：不可以
```
