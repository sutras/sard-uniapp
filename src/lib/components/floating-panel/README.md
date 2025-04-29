---
nav: 组件
title: FloatingPanel
subtitle: 浮动面板
group: 反馈组件
version: 1.13+
---

## 介绍

浮动在页面底部的面板，可以上下拖动来浏览内容，从而在不离开当前视图的情况下访问更多信息，常用于地图导航。

## 引入

```ts
import FloatingPanel from 'sard-uniapp/components/floating-panel/floating-panel.vue'
```

## 代码演示

### 基础使用

`FloatingPanel` 的默认高度为 `100px`，用户可以拖动来展开面板，使高度达到 60% 的可用窗口高度。

@code('${DEMO_PATH}/floating-panel/demo/Basic.vue')

### 自定义锚点

你可以通过 `anchors` 属性来设置 `FloatingPanel` 的锚点位置，并通过 `v-model:height` 来控制当前面板的显示高度。

比如，使面板的高度在 100px、40% 可用窗口高度和 70% 可用窗口高度三个位置停靠：

@code('${DEMO_PATH}/floating-panel/demo/Anchors.vue')

### 仅头部拖拽

默认情况下，`FloatingPanel` 的头部区域和内容区域都可以被拖拽，你可以通过 `content-draggable` 属性来禁用内容区域的拖拽。

@warning

支付宝端内容区域始终不能拖拽，无论有没有设置 `content-draggable` 属性。

@endwarning

@code('${DEMO_PATH}/floating-panel/demo/ContentDraggable.vue')

## API

### FloatingPanelProps

| 属性                   | 描述                    | 类型       | 默认值                                        |
| ---------------------- | ----------------------- | ---------- | --------------------------------------------- |
| root-class             | 组件根元素类名          | string     | -                                             |
| root-style             | 组件根元素样式          | StyleValue | -                                             |
| height                 | 当前面板的显示高度      | number     | 0                                             |
| anchors                | 设置自定义锚点, 单位 px | number[]   | [100, uni.getWindowInfo().windowHeight * 0.6] |
| duration               | 动画时长，单位毫秒      | number     | 300                                           |
| content-draggable      | 允许拖拽内容容器        | boolean    | true                                          |
| safe-area-inset-bottom | 是否开启底部安全区适配  | boolean    | true                                          |

### FloatingPanelSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### FloatingPanelEmits

| 事件          | 描述                             | 类型            |
| ------------- | -------------------------------- | --------------- |
| update:height | 面板显示高度改变时触发           | {value: number} |
| height-change | 面板显示高度改变且结束拖动后触发 | {value: number} |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
