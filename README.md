<p align="center">
  <img alt="logo" src="https://fastly.jsdelivr.net/npm/@sard/assets/logo.svg" width="120" height="120" style="margin-bottom: 10px;">
</p>

<h1 align="center">Sard Uniapp</h1>

<p align="center">sard-uniapp 是一套基于 Uniapp + Vue3 框架开发的兼容多端的 UI 组件库。</p>

<p align="center">
  <a href="https://www.npmjs.com/package/sard-uniapp"><img src="https://img.shields.io/npm/dm/sard-uniapp.svg" alt="Total Downloads"></a>
  <a href="https://github.com/sutras/sard-uniapp/tags"><img src="https://img.shields.io/npm/v/sard-uniapp.svg" alt="Latest Release"></a>
  <a href="https://github.com/sutras/sard-uniapp/graphs/contributors"><img src="https://img.shields.io/github/contributors/sutras/sard-uniapp" alt="Contributors"></a>
  <a href="https://github.com/sutras/sard-uniapp/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/tailwindcss.svg" alt="License"></a>
</p>

<p align="center">
  国内：📖 <a href="http://sard.wzt.zone/">文档</a>&nbsp;&nbsp;&nbsp;&nbsp;
  🧑🏻‍🏫 <a href="http://sard.wzt.zone/mobile/">案例演示</a>&nbsp;&nbsp;&nbsp;&nbsp;
</p>

---

## 介绍

`sard-uniapp` 是一套基于 `Uniapp` + `Vue3`框架开发的兼容多端的 `UI` 组件库。

`sard-uniapp` 兼容 H5 / 小程序（微信、支付宝） / `APP`（不支持 `nvue` 或 `uvue`）。

## 特性

- 🧩 117+个高质量组件，覆盖移动端主流场景
- 💪 支持一套代码同时开发 H5 / 小程序 / App
- 🌿 支持按需引入和 `Tree Shaking`
- 📖 详尽的文档和案例展示
- ʦ 使用 `TypeScript` 编写，提供完整的类型定义
- 🌈 支持定制主题
- 🌍 国际化支持
- 🌙 支持暗黑模式
- 🧪 单元测试覆盖率超过 80%，保障稳定性
- ⭐️ 零外部依赖，不依赖三方 npm 包

## 开源协议

本项目基于 [MIT](https://zh.wikipedia.org/wiki/MIT%E8%A8%B1%E5%8F%AF%E8%AD%89) 协议，请自由地享受和参与开源。

## 更新日志

<a href="https://github.com/sutras/sard-uniapp/blob/main/CHANGELOG.md">更新日志</a>

## 如何维护

### 前提条件

- 确保 node >= v22.22.2
- 建议使用 pnpm 包管理器
- 建议使用 vscode 编辑器

### 克隆仓库到本地

```bash
git clone https://github.com/sutras/sard-uniapp.git
```

### 安装依赖

```bash
npm install
```

### 修改 uniapp 构建脚本源码

打开 `node_modules/@dcloudio/vite-plugin-uni/dist/cli/action.js` 文件，
在 `await (0, build_1.build)(options, async (event) => {` 代码上面插入以下代码：

```js
options.watch = {
  chokidar: {
    ignored: ['!**/sard-uniapp/**'],
  },
}
```

### 运行开发环境

```bash
npm run dev
```

运行上面命令后会生成四个链接：

```bash
Local:   http://localhost:5173/mobile/    （演示）
Network: http://192.168.1.121:5173/mobile/ (局域网演示）
Local:   http://localhost:7761/           （文档）
Network: http://192.168.1.121:7761/       （局域网文档）
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

1. 修复问题
2. 测试 `npm run test`
3. 修改版本号 `packages/sard-uniapp/package.json`
4. 暂存 `git add .`
5. 提交 `git commit -m 'fix: '`
6. 给提交打标签 `npm run tag`
7. 生成 changelog `npm run changelog`
8. 暂存、提交 changelog `git commit -a -m 'chore: changelog'`
9. 打包组件库 `npm run build`
10. 发布到 npm `npm run release`
11. 使用 HBuilderX 发布到 uniapp 插件市场
12. 推送代码和标签 `npm run push`
13. 打包文档 `npm run build:site`
14. 部署文档 `npm run deploy`

## 新增组件流程

1. 运行 `npm run nc` 命令创建组件
2. 运行 `npm run nsc` 命令创建子组件
3. 编写组件代码（接口、类型、结构、样式、交互）
4. 编写案例代码
5. 编写组件文档
6. 编写测试用例
7. 分别在以下环境进行测试：
   - 桌面端浏览器
   - 移动端浏览器
   - 微信开发者工具
   - 微信真机
   - 支付宝开发者工具
   - 支付宝真机
   - 安卓真机
   - iOS模拟器
   - 鸿蒙模拟器
8. 从上面的“修复问题流程”步骤2开始走一遍

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

## 贡献者

感谢这些优秀的人：

<p align="center">
  <a href="https://www.npmjs.com/package/sard-uniapp"><img src="https://contrib.rocks/image?repo=sutras/sard-uniapp&columns=10&anon=1" alt="Contributors"></a>
</p>
