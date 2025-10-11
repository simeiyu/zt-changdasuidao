# 长大隧道智能盾构运行状态检测与诊断系统（边缘端）

本项目是基于 Vue 3 + TypeScript + Vite 的智能盾构运行状态检测与诊断系统前端，配合 Node.js/Express + Socket.io 后端，适用于隧道工程设备监控、数据展示与报警管理。

## 目录结构
```
├── public/                # 静态资源
├── src/
│   ├── assets/            # 图片、图标、样式、常量
│   ├── components/        # 通用组件（图表、报警、信息面板等）
│   ├── store/             # Pinia 状态管理
│   ├── user/              # 用户相关页面
│   ├── views/             # 业务页面（设备概览、泥水环流、盾尾密封等）
│   ├── App.vue            # 根组件
│   ├── main.ts            # 入口文件
│   ├── router.ts          # 路由配置
│   ├── socket.ts          # Socket.io 客户端
├── server.ts              # 后端服务（Express + Socket.io）
├── package.json           # 项目依赖与脚本
├── vite.config.ts         # Vite 配置
├── tsconfig*.json         # TypeScript 配置
```

## 主要功能
- 设备运行状态实时监控与数据展示
- 多系统分区（泥水环流、盾尾密封、推进系统、刀盘系统、驱动电机等）
- 图表可视化（ECharts）
- 报警信息展示与统计
- 用户登录、权限管理
- 响应式布局，适配大屏
- 后端 WebSocket 实时数据推送

## 技术栈
- 前端：Vue 3, TypeScript, Vite, Element Plus, Pinia, ECharts, SCSS
- 后端：Node.js, Express, Socket.io

## 快速开始
1. 安装依赖（推荐使用 pnpm）
	```powershell
	pnpm install
	```
2. 启动前端开发服务器
	```powershell
	pnpm dev
	```
3. 启动后端服务（端口 9093）
	```powershell
	pnpm ts-node server.ts
	```
	或
	```powershell
	node server.ts
	```
4. 访问页面
	```
	http://localhost:5173
	```

## 构建与预览
```powershell
pnpm build      # 构建生产包
pnpm preview    # 本地预览生产包
```

## 代码规范
- 使用 TypeScript 进行类型约束
- 组件样式采用 SCSS 并使用 scoped
- 推荐使用 VS Code 编辑器，配合 ESLint/Stylelint 插件

## 相关命令
- `pnpm lint:style`  自动修复样式问题

## 贡献与反馈
如有建议或问题，请提交 Issue 或联系项目维护者。
