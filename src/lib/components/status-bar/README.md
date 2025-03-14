---
nav: 组件
title: StatusBar
subtitle: 状态栏
group: 布局
version: 1.12+
---

## 介绍

用于自定义导航栏时的状态栏占位，`Navbar`、`Notify` 等定位在顶部的元素会使用到。

状态栏高度是通过 `uni.getSystemInfoSync().statusBarHeight` 获取的，在 `app`, `h5` 和小程序都可以直接使用，在 `h5` 端状态栏高度为 0，其他两个端为设备的状态栏的高度。

@info
如果应用是嵌套在 `app` 的 `webview` 中，`uniapp` 提供的接口获取的状态栏高度跟 `h5` 一样，都是 0；如果要全屏展示，则需要 `app` 原生那边提供接口来获取状态栏高度。

针对此场景，要使 `StatusBar` 正常使用，需要全局设置 `StatusBar` 组件的 `height` 属性，且要设置为一个 `css` 变量，在获取到手机状态栏高度时，将其声明到 `html` 元素上。举例如下：

```ts
// main.ts

// 1. 全局设置 `StatusBar` 组件的 `height` 属性
// !!! 切记变量名不要设置为 `--status-bar-height`，避免被 uniapp 覆盖掉。
import { setConfig } from 'sard-uniapp'
setConfig({
  statusBar: {
    height: 'var(--app-status-bar-height)',
  },
})

// 2. 获取状态栏高度
// 假设接口如下
const statusBarHeight = window.toggle.getBarHeight()

// 3. 声明到 html 元素上
document.documentElement.style.setProperty(
  '--app-status-bar-height',
  statusBarHeight + 'px',
)
```

@endinfo

## 引入

```ts
import StatusBar from 'sard-uniapp/components/status-bar/status-bar.vue'
```

## 代码演示

### 基础使用

@code('${DEMO_PATH}/status-bar/demo/Basic.vue')

## API

### StatusBarProps

| 属性       | 描述                 | 类型       | 默认值 |
| ---------- | -------------------- | ---------- | ------ |
| root-class | 组件根元素类名       | string     | -      |
| root-style | 组件根元素样式       | StyleValue | -      |
| height     | 手动设置状态栏高度， | string     | -      |
| reverse    | 设置宽度而不是高度   | boolean    | false  |

### StatusBarSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |
