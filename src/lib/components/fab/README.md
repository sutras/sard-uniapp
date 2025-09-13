---
nav: 组件
title: Fab
subtitle: 悬浮按钮
group: 反馈组件
version: 1.5+
---

## 介绍

悬浮按钮，点击可展开扩展按钮。

## 引入

```ts
import Fab from 'sard-uniapp/components/fab/fab.vue'
import FabItem from 'sard-uniapp/components/fab-item/fab-item.vue'
```

## 代码演示

### 基础使用

设置 `item-list` 属性配置扩展按钮，监听 `select` 事件来知晓用户点击了哪个按钮。

@code('${DEMO_PATH}/fab/demo/Basic.vue')

### 自定义颜色

设置 `background` 属性以及按钮项的 `background` 自定义背景色。

@code('${DEMO_PATH}/fab/demo/Color.vue')

### 隐藏按钮名称

默认会显示按钮项的 `name` 属性，可以设置 `hide-name` 属性进行隐藏。

@code('${DEMO_PATH}/fab/demo/HideName.vue')

### 左上角显示

按钮默认显示在右下角，设置 `left` 或 `top` 可以让其显示在左上角。

@code('${DEMO_PATH}/fab/demo/TopLeft.vue')

### 右上角显示

按钮默认显示在右下角，设置 `top` 会将其从底部显示在顶部。

@code('${DEMO_PATH}/fab/demo/TopRight.vue')

### 左下角显示

按钮默认显示在右下角，设置 `left` 会将其从右边显示在左边。

@code('${DEMO_PATH}/fab/demo/BottomLeft.vue')

### 自定义图标

使用 `icon` 和 `icon-family` 可自定义悬浮按钮图标。

@code('${DEMO_PATH}/fab/demo/Icon.vue')

### 自定义插槽内容 <sup>1.24.3+</sup>

使用 `default` 插槽自定义入口按钮内容，使用 `list` 插槽自定义扩展按钮内容，需要自行循环 `FabItem` 组件。

@code('${DEMO_PATH}/fab/demo/Slots.vue')

### 可拖拽的 <sup>1.24.2+</sup>

设置 `draggable` 属性，悬浮按钮展示在右下角，允许在 y 轴方向上下拖拽。

@code('${DEMO_PATH}/fab/demo/Draggable.vue')

### 自由拖拽和磁吸 <sup>1.24.2+</sup>

`axis` 属性设置允许在 x 或 y 轴方向拖拽，`magnet` 属性设置松开手指后吸附到指定轴方向的最近一边。

@code('${DEMO_PATH}/fab/demo/Magnet.vue')

### 双向绑定 <sup>1.24.2+</sup>

使用 `v-model:offset` 控制悬浮按钮的位置。

@code('${DEMO_PATH}/fab/demo/Offset.vue')

## API

### FabProps

| 属性                                | 描述                                                      | 类型                           | 默认值 |
| ----------------------------------- | --------------------------------------------------------- | ------------------------------ | ------ |
| root-class                          | 组件根元素类名                                            | string                         | -      |
| root-style                          | 组件根元素样式                                            | StyleValue                     | -      |
| top                                 | 设置距离窗口顶部的距离，优先级比 `bottom` 高              | string                         | -      |
| right                               | 设置距离窗口右边的距离                                    | string                         | -      |
| bottom                              | 设置距离窗口底部的距离                                    | string                         | -      |
| left                                | 设置距离窗口左边的距离，优先级比 `right` 高               | string                         | -      |
| color                               | 设置按钮图标的颜色                                        | string                         | -      |
| background                          | 设置按钮的背景色                                          | string                         | -      |
| icon                                | 设置入口按钮的图标                                        | string                         | -      |
| visible-icon <sup>1.24.3+</sup>     | 设置弹出扩展按钮时的入口按钮的图标                        | string                         | -      |
| icon-family                         | 设置入口按钮的图标族                                      | string                         | -      |
| item-list                           | 设置扩展按钮                                              | FabItem[]                      | []     |
| hide-name                           | 是否隐藏按钮名称                                          | boolean                        | false  |
| overlay-closable                    | 点击遮罩是否隐藏扩展按钮                                  | boolean                        | false  |
| duration                            | 扩展按钮显隐动画时长，单位 ms                             | number                         | 150    |
| draggable <sup>1.24.2+</sup>        | 是否可拖拽                                                | boolean                        | false  |
| axis <sup>1.24.2+</sup>             | 允许拖拽的方向轴                                          | 'x' \| 'y' \| 'both' \| 'none' | 'y'    |
| magnet <sup>1.24.2+</sup>           | 吸附到指定轴最近的一边，在拖拽时使用                      | 'x' \| 'y'                     | -      |
| gap-x <sup>1.24.2+</sup>            | 悬浮按钮与窗口左右两边的最小间距，单位为 px，在拖拽时使用 | number                         | 24     |
| gap-y <sup>1.24.2+</sup>            | 悬浮按钮与窗口上下两边的最小间距，单位为 px，在拖拽时使用 | number                         | 24     |
| offset (v-model) <sup>1.24.2+</sup> | 控制悬浮按钮的位置，在拖拽时使用                          | { x: number; y: number }       | -      |
| navbar-height <sup>1.24.3+</sup>    | 自定义顶部导航栏的高度，在拖拽时使用                      | number                         | 0      |
| tabbar-height <sup>1.24.3+</sup>    | 自定义底部标签栏的高度，在拖拽时使用                      | number                         | 0      |

### FabSlots <sup>1.24.3+</sup>

| 插槽    | 描述               | 属性                                                    |
| ------- | ------------------ | ------------------------------------------------------- |
| default | 自定义入口按钮内容 | { visible: boolean }                                    |
| list    | 自定义扩展按钮内容 | { onItemClick: (item: FabItem, index: number) => void } |

### FabEmits

| 事件                             | 描述                         | 类型                                       |
| -------------------------------- | ---------------------------- | ------------------------------------------ |
| click                            | 点击入口按钮时触发           | (event: any) => void                       |
| select                           | 点击扩展按钮时触发           | (item: FabItem, index: number) => void     |
| update:offset <sup>1.24.2+</sup> | 因用户拖拽导致位置改变时触发 | (offset: { x: number; y: number }) => void |

### FabItem

| 属性        | 描述         | 类型   | 默认值 |
| ----------- | ------------ | ------ | ------ |
| name        | 按钮名称     | string | -      |
| color       | 按钮图标颜色 | string | -      |
| background  | 按钮背景色   | string | -      |
| icon        | 按钮图标     | string | -      |
| icon-family | 按钮图标族   | string | -      |

### FabItemProps <sup>1.24.3+</sup>

| 属性        | 描述           | 类型       | 默认值 |
| ----------- | -------------- | ---------- | ------ |
| root-class  | 组件根元素类名 | string     | -      |
| root-style  | 组件根元素样式 | StyleValue | -      |
| name        | 按钮名称       | string     | -      |
| color       | 按钮图标颜色   | string     | -      |
| background  | 按钮背景色     | string     | -      |
| icon        | 按钮图标       | string     | -      |
| icon-family | 按钮图标族     | string     | -      |

### FabItemSlots <sup>1.24.3+</sup>

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义按钮内容 | -    |

### FabItemEmits <sup>1.24.3+</sup>

| 事件  | 描述           | 类型                 |
| ----- | -------------- | -------------------- |
| click | 点击按钮时触发 | (event: any) => void |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
