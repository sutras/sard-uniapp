---
nav: 组件
title: FloatingBubble
subtitle: 浮动气泡
group: 反馈组件
version: 1.5+
---

## 介绍

悬浮在窗口边缘的可点击的气泡。

## 引入

```ts
import FloatingBubble from 'sard-uniapp/components/floating-bubble/floating-bubble.vue'
```

## 代码演示

### 基础使用

浮动气泡默认展示在右下角，并允许在 y 轴方向上下拖拽。

@code('${DEMO_PATH}/floating-bubble/demo/Basic.vue')

### 自由拖拽和磁吸

`axis` 属性设置允许在 x 或 y 轴方向拖拽，`magnet` 属性设置松开手指后吸附到指定轴方向的最近一边。

@code('${DEMO_PATH}/floating-bubble/demo/Magnet.vue')

### 双向绑定

使用 `v-model:offset` 控制气泡的位置。

@code('${DEMO_PATH}/floating-bubble/demo/Offset.vue')

## API

### FloatingBubbleProps

| 属性                             | 描述                                    | 类型                           | 默认值 |
| -------------------------------- | --------------------------------------- | ------------------------------ | ------ |
| root-class                       | 组件根元素类名                          | string                         | -      |
| root-style                       | 组件根元素样式                          | StyleValue                     | -      |
| axis                             | 允许拖拽的方向轴                        | 'x' \| 'y' \| 'both' \| 'none' | 'y'    |
| magnet                           | 吸附到指定轴最近的一边                  | 'x' \| 'y'                     | -      |
| gap-x                            | 气泡与窗口左右两边的最小间距，单位为 px | number                         | 24     |
| gap-y                            | 气泡与窗口上下两边的最小间距，单位为 px | number                         | 24     |
| offset (v-model)                 | 控制气泡的位置                          | { x: number; y: number }       | -      |
| draggable <sup>1.24.2+</sup>     | 是否可拖拽                              | boolean                        | true   |
| navbar-height <sup>1.24.3+</sup> | 自定义顶部导航栏的高度                  | number                         | 0      |
| tabbar-height <sup>1.24.3+</sup> | 自定义底部标签栏的高度                  | number                         | 0      |

### FloatingBubbleSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### FloatingBubbleEmits

| 事件          | 描述                         | 类型                                       |
| ------------- | ---------------------------- | ------------------------------------------ |
| click         | 点击时触发                   | (event: any) => void                       |
| update:offset | 因用户拖拽导致位置改变时触发 | (offset: { x: number; y: number }) => void |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
