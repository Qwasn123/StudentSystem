# 导师管理系统 (Mentor Management System)

一个现代化的导师管理系统，用于高效管理导师-学生关系、任务分配和会议安排。

## 功能特点

- 📊 仪表板概览
- 👥 导师管理
- 🎓 学生管理
- ✅ 任务跟踪
- 📅 会议管理
- 📈 数据统计
- ⚙️ 系统设置

## 技术栈

- **前端框架**: React 18
- **构建工具**: Vite
- **状态管理**: Redux Toolkit
- **路由管理**: React Router v6
- **样式方案**: Tailwind CSS
- **图表库**: Chart.js + react-chartjs-2
- **图标**: Heroicons
- **类型检查**: TypeScript

## 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 8.0.0

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 测试账号

使用以下账号进行测试：

- **邮箱**: test@example.com
- **密码**: 123456

## 项目结构

```
my-app/
├── src/
│   ├── components/     # 可复用组件
│   ├── pages/         # 页面组件
│   ├── store/         # Redux 状态管理
│   ├── hooks/         # 自定义 Hooks
│   ├── utils/         # 工具函数
│   ├── types/         # TypeScript 类型定义
│   ├── App.tsx        # 应用入口
│   └── main.tsx       # 主入口文件
├── public/            # 静态资源
└── package.json       # 项目配置
```

## 主要功能模块

### 1. 仪表板
- 系统概览
- 关键指标展示
- 待办事项提醒

### 2. 导师管理
- 导师信息管理
- 导师分配
- 工作量统计

### 3. 学生管理
- 学生信息管理
- 学习进度跟踪
- 成绩记录

### 4. 任务管理
- 任务创建与分配
- 进度跟踪
- 任务优先级管理

### 5. 会议管理
- 会议安排
- 会议记录
- 线上/线下会议支持

### 6. 数据统计
- 导师工作量统计
- 学生成绩分析
- 任务完成率分析

### 7. 系统设置
- 个人信息设置
- 通知设置
- 系统主题设置
- 安全设置

## 开发规范

- 使用 TypeScript 进行类型检查
- 遵循 React Hooks 最佳实践
- 使用 Tailwind CSS 进行样式管理
- 组件采用函数式组件

## 浏览器支持

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

## 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件
