---
nav: 组件
title: Popup
subtitle: 弹出层
group: 数据展示
---

## 介绍

所有可弹出组件的底层组件，可自定义弹出方向和内容。后弹出的弹出层总是比之前的层级要大。

## 引入

```ts
import Popup from 'sard-uniapp/components/popup/popup.vue'
```

## 代码演示

### 基础使用

使用 `visible` 控制显隐。
使用 `effect` 控制显隐效果。

@code('${DEMO_PATH}/popup/demo/Basic.vue')

## API

### PopupProps

| 属性        | 描述                  | 类型                                                                               | 默认值 |
| ----------- | --------------------- | ---------------------------------------------------------------------------------- | ------ |
| root-class  | 组件根元素类名        | string                                                                             | -      |
| root-style  | 组件根元素样式        | StyleValue                                                                         | -      |
| visible     | 是否可见              | boolean                                                                            | false  |
| duration    | 显隐动画时长，单位 ms | number                                                                             | 300    |
| effect      | 显隐效果              | 'slide-top' \| 'slide-right' \| 'slide-bottom' \| 'slide-left' \| 'zoom' \| 'fade' | 'fade' |
| overlay     | 是否显示遮罩          | boolean                                                                            | true   |
| background  | 遮罩背景色            | string                                                                             | -      |
| transparent | 透明遮罩              | boolean                                                                            | false  |

### PopupSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### PopupEmits

| 事件            | 描述               | 类型                 |
| --------------- | ------------------ | -------------------- |
| overlay-click   | 点击遮罩时触发     | (event: any) => void |
| before-enter    | 入场动画开始前触发 | () => void           |
| enter           | 入场动画开始时触发 | () => void           |
| after-enter     | 入场动画结束时触发 | () => void           |
| enter-cancelled | 入场动画取消时触发 | () => void           |
| before-leave    | 退场动画开始前触发 | () => void           |
| leave           | 退场动画开始时触发 | () => void           |
| after-leave     | 退场动画结束时触发 | () => void           |
| leave-cancelled | 退场动画取消时触发 | () => void           |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
