<p align="center">
  <img alt="logo" src="https://fastly.jsdelivr.net/npm/@sard/assets/logo.svg" width="120" height="120" style="margin-bottom: 10px;">
</p>

<h1 align="center">Sard Uniapp</h1>

<p align="center">sard-uniapp 是一套基于 Uniapp + Vue3 框架开发的兼容多端的 UI 组件库。</p>

<p align="center">
  📖 <a href="http://sutras.gitee.io/sard-uniapp-docs">文档 (gitee)</a>&nbsp;&nbsp;&nbsp;&nbsp;
  🧑🏻‍🏫 <a href="http://sutras.gitee.io/sard-uniapp-docs/mobile/">案例演示 (gitee)</a>&nbsp;&nbsp;&nbsp;&nbsp;
</p>
<p align="center">
  📖 <a href="http://sutras.github.io/sard-uniapp-docs">文档 (github)</a>&nbsp;&nbsp;&nbsp;&nbsp;
  🧑🏻‍🏫 <a href="http://sutras.github.io/sard-uniapp-docs/mobile/">案例演示 (github)</a>&nbsp;&nbsp;&nbsp;&nbsp;
</p>

---

## 介绍

`sard-uniapp` 是一套基于 `Uniapp` + `Vue3`框架开发的兼容多端的 `UI` 组件库。

`sard-uniapp` 兼容 H5 / 小程序 / `APP`（不支持 `nvue` 或 `uvue`）。

## 特性

- 🧩 70+个高质量组件，覆盖移动端主流场景
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

### 全局安装 pnpm（如果未安装）

```bash
npm install -g pnpm
```

### 使用 pnpm 安装依赖

```bash
pnpm install
```

### 修改 @dcloudio 源码

安装完依赖，需要修改@dcloudio 里面的一个地方，具体参考以下文档中的第一个问题（“热更新无效”）：

[https://zhuanlan.zhihu.com/p/665000866](https://zhuanlan.zhihu.com/p/665000866)

### 运行开发环境

```bash
pnpm run dev
```

运行上面命令后会生成四个链接：

```bash
Local:   http://localhost:5173/sard-uniapp-docs/mobile/    （演示）
Network: http://192.168.1.121:5173/sard-uniapp-docs/mobile/ (局域网演示）
Local:   http://localhost:7761/sard-uniapp-docs/           （文档）
Network: http://192.168.1.121:7761/sard-uniapp-docs/       （局域网文档）
```
