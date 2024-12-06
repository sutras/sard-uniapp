---
nav: 指引
title: 快速上手
order: 1
group:
  title: 基础
---

## 安装

`sard-uniapp` 支持通过命令行以及插件市场导入 `HBuilderX` 的方式安装。

### NPM

#### 安装 sass

`sard-uniapp` 依赖于 `sass` 来构建 `css`，因此使用前要先进行安装。

```bash
npm install sass -D
```

#### 安装 sard-uniapp

```bash
npm install sard-uniapp
```

### HBuilderX

#### 安装 sass

`HBuilderX` 内置了 `sass` 插件。

#### 安装 sard-uniapp

使用 `HBuilderX` 开发的用户，可以在 `uni-app` 插件市场通过 `uni_modules` 的形式进行安装。

在 `uni-app` 插件市场右上角点击 `下载插件并导入HBuilderX` 按钮，导入到对应的项目中即可。

插件地址：<a href="https://ext.dcloud.net.cn/plugin?id=16001" target="_blank">https://ext.dcloud.net.cn/plugin?id=16001</a>

## 配置

### vite

在 web 开发环境使用 `sard-uniapp` 时，为避免 `vite` 依赖预构建缓存 `sard-uniapp` 部分文件导致出现问题，
需要在预构建中强制排除对 `sard-uniapp` 的依赖。

```ts
// vite.config.ts
export default defineConfig({
  optimizeDeps: {
    exclude: ['sard-uniapp'],
  },
})
```

### 配置 easycom

建议使用 `easycom` 来简化组件的引入和注册。

#### NPM

```json
// pages.json
{
  "easycom": {
    "custom": {
      "^sar-(.*)": "sard-uniapp/components/$1/$1.vue"
    }
  }
}
```

#### HBuilderX

如果你是通过插件市场导入到 `HBuilderX` 的，需要修改一下组件路径：

```json
// pages.json
{
  "easycom": {
    "custom": {
      "^sar-(.*)": "@/uni_modules/sard-uniapp/components/$1/$1.vue"
    }
  }
}
```

### 配置全局组件类型

在 `vscode` 中使用时，为了有组件的类型提示和自动填充，需要配置全局组件类型声明。

```json
// tsconfig.json
{
  "compilerOptions": {
    "types": ["sard-uniapp/global"]
  }
}
```

## 引入全局样式

全局样式文件定义了所有组件共用的一些 `css` 变量。

### NPM

```html
<!-- App.vue -->
<style lang="scss">
  @import 'sard-uniapp/index.scss';
</style>
```

### HBuilderX

如果你是通过插件市场导入到 `HBuilderX` 的，需要修改引入路径：

```html
<!-- App.vue -->
<style lang="scss">
  @import '@/uni_modules/sard-uniapp/index.scss';
</style>
```

## 使用组件

### Button 组件示例

```html
<template>
  <sar-button>按钮</sar-button>
</template>
```
