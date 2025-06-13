---
nav: 组件
title: Toast
subtitle: 轻提示
group: 反馈组件
---

## 介绍

在页面中间弹出黑色半透明提示，表示提示、结果、加载中状态。

## 引入

```ts
import Toast from 'sard-uniapp/components/toast/toast.vue'
import ToastAgent from 'sard-uniapp/components/toast-agent/toast-agent.vue'
import { toast } from 'sard-uniapp'
```

## 代码演示

### 基础使用

先在页面放置代理组件。

```tsx
<sar-toast-agent />
```

接着便可以使用 `toast` 等方法显示提示。

@code('${DEMO_PATH}/toast/demo/Basic.vue')

### 自定义位置

`Toast` 默认渲染在屏幕正中位置，通过 `position` 属性可以控制提示展示的位置。

@code('${DEMO_PATH}/toast/demo/Placement.vue')

### 加载中的背景

默认显示加载类型的提示不会显示遮罩背景，设置 `overlay: true` 会显示黑色遮罩， 设置 `transparent: true` 会让背景变透明。

@code('${DEMO_PATH}/toast/demo/Mask.vue')

## API

### ToastProps

| 属性        | 描述                     | 类型                                       | 默认值   |
| ----------- | ------------------------ | ------------------------------------------ | -------- |
| type        | 提示框类型               | 'text' \| 'loading' \| 'success' \| 'fail' | 'text'   |
| title       | 标题                     | string \| number                           | -        |
| visible     | 是否可见                 | boolean                                    | -        |
| position    | 提示框垂直方向放置的位置 | 'top' \| 'center' \| 'bottom'              | 'center' |
| overlay     | 是否显示背景遮罩         | boolean                                    | false    |
| transparent | 使背景透明               | boolean                                    | false    |
| timeout     | 提示的延迟时间，单位 ms  | number                                     | 1500     |
| duration    | 显隐动画时长，单位 ms    | number                                     | 300      |

### ToastEmits

| 事件           | 描述             | 类型                       |
| -------------- | ---------------- | -------------------------- |
| update:visible | 对话框显隐时触发 | (visible: boolean) => void |

### ToastAgentProps / ToastOptions

继承 [`ToastProps`](#ToastProps) 并有以下额外属性。

| 属性 | 描述          | 类型   | 默认值  |
| ---- | ------------- | ------ | ------- |
| id   | 提示组件的 id | string | 'toast' |

### 命令式方法

| 名称    | 描述                       | 类型                    |
| ------- | -------------------------- | ----------------------- |
| toast   | 显示提示                   | ToastFunction           |
| success | 显示成功类型提示           | ToastSimpleShowFunction |
| fail    | 显示失败类型提示           | ToastSimpleShowFunction |
| loading | 显示加载类型提示           | ToastSimpleShowFunction |
| hide    | 隐藏指定 `id` 的命令式提示 | (id = 'toast') => void  |
| hideAll | 隐藏所有命令式提示         | () => void              |

### ToastFunction

```ts
type ToastFunction = ToastSimpleShowFunction & {
  success: ToastSimpleShowFunction
  fail: ToastSimpleShowFunction
  loading: ToastSimpleShowFunction
  hide: (id?: string) => void
  hideAll: () => void
}
```

### ToastSimpleShowFunction

```ts
interface ToastSimpleShowFunction {
  (options: ToastOptions): void
  (title?: string | number, options?: ToastOptions): void
}
```

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
