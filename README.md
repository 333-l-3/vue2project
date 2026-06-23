# GameStore 游戏商店

> Vue2 前端实训项目 — 仿 Steam 风格游戏商店

## 技术栈

| 技术 | 说明 |
|------|------|
| Vue 2.6 | 前端框架 |
| Vue Router 3.x | 路由管理 |
| Vuex 3.x | 状态管理（购物车） |
| Element UI 2.x | UI 组件库 |
| SCSS/Sass | CSS 预处理器 |
| ES6+ | JavaScript 新特性 |

## 项目结构

```
src/
├── assets/              # 静态资源
├── components/          # 公共组件
│   ├── NavBar.vue       # 导航栏
│   ├── FooterBar.vue    # 底部信息
│   ├── SearchSection.vue # 搜索模块
│   ├── CarouselSection.vue # 轮播模块
│   ├── AdBanner.vue     # 广告位
│   └── GameSection.vue  # 游戏列表组件
├── views/               # 页面
│   ├── HomeView.vue     # 首页
│   ├── GameList.vue     # 游戏列表页
│   ├── GameDetail.vue   # 游戏详情页
│   └── Cart.vue         # 购物车页
├── store/               # Vuex 状态管理
│   ├── index.js
│   └── modules/cart.js  # 购物车模块
├── router/              # 路由配置
├── data/games.json      # Mock 数据
├── styles/              # 全局 SCSS
│   ├── _variables.scss  # 变量
│   ├── _mixins.scss     # Mixin
│   └── global.scss      # 全局样式
├── App.vue
└── main.js
```

## 功能模块

### 首页 (`/`)
- ✅ 主导航栏（Logo + 菜单 + 搜索 + 购物车）
- ✅ 搜索功能模块（带热门标签）
- ✅ 轮播展示模块（3 张游戏大图）
- ✅ 广告位模块
- ✅ 内容列表展示（热销排行 / 新品上市 / 免费畅玩）
- ✅ 网站底部信息模块

### 游戏列表 (`/games`)
- ✅ 关键词搜索 + 分类筛选
- ✅ 游戏卡片网格展示
- ✅ Element UI 分页组件

### 游戏详情 (`/game/:id`)
- ✅ 游戏封面 + 详细信息
- ✅ 分类标签 + 评分展示
- ✅ 价格展示 + 加入购物车
- ✅ 游戏截图预览

### 购物车 (`/cart`)
- ✅ Vuex 状态管理 + localStorage 持久化
- ✅ 商品列表展示 + 移除操作
- ✅ 合计金额计算
- ✅ 清空 / 结算功能

## 运行说明

### 环境要求
- Node.js >= 14
- pnpm（或 npm/yarn）

### 安装依赖
```bash
pnpm install
```

### 启动开发服务器
```bash
pnpm run serve
```
浏览器访问 http://localhost:8080

### 生产构建
```bash
pnpm run build
```

## 实训要点覆盖

| 要点 | 项目应用 |
|------|----------|
| HTML5/CSS3/JS 基础 | 语义化标签、Flex/Grid 布局、ES6 语法 |
| SCSS | 变量、Mixin、嵌套、全局注入 |
| Vue CLI + Element UI | 脚手架搭建、组件库使用 |
| Vue2 全家桶 | Vue Router 路由、Vuex 状态管理 |
| Git 版本管理 | 阶段性提交记录 |
| 前端编译逻辑 | vue.config.js 配置、打包流程 |
