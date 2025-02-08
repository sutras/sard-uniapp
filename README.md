<p align="center">
  <img alt="logo" src="https://fastly.jsdelivr.net/npm/@sard/assets/logo.svg" width="120" height="120" style="margin-bottom: 10px;">
</p>

<h1 align="center">Sard Uniapp</h1>

<p align="center">sard-uniapp 是一套基于 Uniapp + Vue3 框架开发的兼容多端的 UI 组件库。</p>

<p align="center">
  国内：📖 <a href="http://sard.wzt.zone/sard-uniapp-docs">文档</a>&nbsp;&nbsp;&nbsp;&nbsp;
  🧑🏻‍🏫 <a href="http://sard.wzt.zone/sard-uniapp-docs/mobile/">案例演示</a>&nbsp;&nbsp;&nbsp;&nbsp;
</p>
<p align="center">
  国外：📖 <a href="http://sutras.github.io/sard-uniapp-docs">文档</a>&nbsp;&nbsp;&nbsp;&nbsp;
  🧑🏻‍🏫 <a href="http://sutras.github.io/sard-uniapp-docs/mobile/">案例演示</a>&nbsp;&nbsp;&nbsp;&nbsp;
</p>

---

## 介绍

`sard-uniapp` 是一套基于 `Uniapp` + `Vue3`框架开发的兼容多端的 `UI` 组件库。

`sard-uniapp` 兼容 H5 / 小程序 / `APP`（不支持 `nvue` 或 `uvue`）。

## 特性

- 🧩 74+个高质量组件，覆盖移动端主流场景
- 💪 支持一套代码同时开发 H5 / 小程序 / App
- 🌿 支持按需引入和 `Tree Shaking`
- 📖 详尽的文档和案例展示
- ʦ 使用 `TypeScript` 编写，提供完整的类型定义
- 🌈 支持定制主题
- 🌍 国际化支持
- 🌙 支持暗黑模式
- 🧪 单元测试覆盖率超过 80%，保障稳定性
- ⭐️ 零外部依赖，不依赖三方 `npm` 包

## 开源协议

本项目基于 [MIT](https://zh.wikipedia.org/wiki/MIT%E8%A8%B1%E5%8F%AF%E8%AD%89) 协议，请自由地享受和参与开源。

## 如何维护

### 克隆仓库到本地

```bash
git clone https://github.com/sutras/sard-uniapp.git
```

### 安装依赖

```bash
npm install
```

### 运行开发环境

```bash
npm run dev
```

运行上面命令后会生成四个链接：

```bash
Local:   http://localhost:5173/sard-uniapp-docs/mobile/    （演示）
Network: http://192.168.1.121:5173/sard-uniapp-docs/mobile/ (局域网演示）
Local:   http://localhost:7761/sard-uniapp-docs/           （文档）
Network: http://192.168.1.121:7761/sard-uniapp-docs/       （局域网文档）
```

### 测试

```bash
npm run test
```

### 构建文档站点

```bash
npm run build:site
```

### 预览构建的文档站点

```bash
npm run preview
```

### 构建组件库

```bash
npm run build
```

### 部署文档站点到 github pages

```bash
npm run deploy
```

### 发布组件库到 npm

```bash
npm run release
```

## 修复问题流程

- 修复问题
- 测试
- 修改版本号
- 暂存
- 提交
- 给提交打标签
- 运行 `npm run buildAndRelease` 打包组件库并发布到 npm
- 发布到 uniapp 插件市场
- 运行 `npm run push` 推送代码和标签
- 运行 `npm run build:site` 打包文档（如果文档有修改）
- 运行 `npm run deploy` 部署文档（如果文档有修改）
- 更新 gitee 上的文档（如果文档有修改）

## 新增组件流程

- 运行 `npm run newComponent` 命令自动创建组件
- 编写组件代码
- 编写案例代码
- 编写组件文档
- 编写测试用例
- 使用实际项目本地安装测试 `pnpm link ../sard-uniapp`
- 从上面的“修复问题流程”第三部“修改版本号”开始走一遍

## 打包安卓包流程

- 在 `HBuilder` 中打开 `sard-uniapp` 项目
- 点击 发行->App-Android/iOS-云打包
- 勾选“android(apk 包)” 、“使用云端证书”、“打正式包”、“快速安心打包”
- 点击“打包“按钮开始打包
- 注意：如果控制台出现错误：`[ERROR] Cannot start service: Host version "_._._" does not match - binary version "_._._"`，需安装和 Host version 一样版本的 `@esbuild/darwin-x64`
- 等待云端打包完成
- 到 `gitee` 仓库创建发行版：[resource 发行版 - Gitee.com](https://gitee.com/sutras/resource/releases/new)
- 将 gitee 发行版 apk 资源链接转换为二维码图片
- 将图片更新到 `sard-assets` 项目，并发布到 npm
- 最后等待 http://fastly.jsdelivr.net 链接生效
