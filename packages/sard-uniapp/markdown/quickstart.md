# 快速上手

## 前提条件

使用 `sard-uniapp` 组件库的`uniapp` 项目需要通过命令行的方式创建。因为通过 `HBuilderX` 创建的项目，其依赖的很多软件包版本过低，在使用 `sard-uniapp` 的过程中可能会有错误。

`uniapp`项目创建文档：
<a href="https://uniapp.dcloud.net.cn/quickstart-cli.html" target="_blank">https://uniapp.dcloud.net.cn/quickstart-cli.html</a>

## 安装

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

```bash
npm install sass -D
```

#### 安装 sard-uniapp

使用 `HBuilderX` 开发的用户，可以在 `uni-app` 插件市场通过 `uni_modules` 的形式进行安装。

在 `uni-app` 插件市场右上角点击 `下载插件并导入HBuilderX` 按钮，导入到对应的项目中即可。

插件地址：<a href="https://ext.dcloud.net.cn/plugin?id=16001" target="_blank">https://ext.dcloud.net.cn/plugin?id=16001</a>

## 配置

### vite

在 web 开发环境使用 `sard-uniapp` 时，为避免 `vite` 依赖预构建缓存 `sard-uniapp` 部分文件导致出现问题，
需要在预构建中强制排除对 `sard-uniapp` 的依赖。

`vite.config.ts`

```ts
export default defineConfig({
  optimizeDeps: {
    exclude: ['sard-uniapp'],
  },
})
```

### 配置 easycom

建议使用 `easycom` 来简化组件的引入和注册。

#### NPM

`pages.json`

```json
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

`pages.json`

```json
{
  "easycom": {
    "custom": {
      "^sar-(.*)": "@/uni_modules/sard-uniapp/components/$1/$1.vue"
    }
  }
}
```

### 配置全局组件类型

`tsconfig.json`

```json
{
  "compilerOptions": {
    "types": ["sard-uniapp/global"]
  }
}
```

## 引入全局样式

全局样式文件定义了所有组件共用的一些 `css` 变量。

### NPM

`App.vue`

```html
<style lang="scss">
  @import 'sard-uniapp/index.scss';
</style>
```

### HBuilderX

如果你是通过插件市场导入到 `HBuilderX` 的，需要修改一下组件路径：

`App.vue`

```html
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
