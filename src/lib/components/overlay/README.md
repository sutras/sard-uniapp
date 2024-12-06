---
nav: 组件
title: Overlay
subtitle: 遮罩层
group: 反馈组件
---

## 介绍

创建一个遮罩层，用于强调特定的页面元素，并阻止用户进行其他操作。

## 引入

```ts
import Overlay from 'sard-uniapp/components/overlay/overlay.vue'
```

## 代码演示

### 基础使用

使用`visible`属性控制其显隐。

@code('${DEMO_PATH}/overlay/demo/Basic.vue')

## API

### OverlayProps

| 属性        | 描述                 | 类型             | 默认值 |
| ----------- | -------------------- | ---------------- | ------ |
| root-class  | 组件根元素类名       | string           | -      |
| root-style  | 组件根元素样式       | StyleValue       | -      |
| visible     | 控制显隐             | boolean          | -      |
| z-index     | 设置层级             | number \| string | -      |
| duration    | 透明度过渡持续时间   | number           | 300    |
| background  | 自定义遮罩层的背景色 | string           | -      |
| transparent | 透明遮罩             | boolean          | false  |

### OverlaySlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### OverlayEmits

| 事件  | 描述           | 类型                 |
| ----- | -------------- | -------------------- |
| click | 点击遮罩时触发 | (event: any) => void |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
