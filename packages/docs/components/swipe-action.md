---
title: SwipeAction
subtitle: 滑动操作
group: 反馈组件
version: 1.19+
---

## 介绍

可以左右滑动来展示操作按钮。

## 引入

```js
import SwipeAction from 'sard-uniapp/components/swipe-action/swipe-action.vue'
import SwipeActionGroup from 'sard-uniapp/components/swipe-action-group/swipe-action-group.vue'
```

## 代码演示

### 基础使用

使用 `left`、`right` 插槽向左右两边添加操作按钮。

插槽接收 `hide` 方法来隐藏操作按钮。

<<< @demo/swipe-action/demo/Basic.vue

### 控制显隐

使用 `v-model:visible` 属性控制显隐。

<<< @demo/swipe-action/demo/Visible.vue

### 手风琴 <sup>1.30+</sup>

使用 `SwipeActionGroup` 管理一组 `SwipeAction`。默认只允许同时展示一个组件的操作按钮，也可以通过 `closeAll` 方法关闭全部操作按钮。

<<< @demo/swipe-action/demo/Accordion.vue

### 禁止滑动

使用 `disabled` 属性来禁用滑动，同时也会禁用点击内容区域隐藏。

<<< @demo/swipe-action/demo/Visible.vue

### 异步关闭

插槽按钮可任意定制；利用好 `hide` 方法和 `disabled` 属性，可实现复杂的效果。

<<< @demo/swipe-action/demo/Async.vue

### 结合表单使用

下面演示了滑动操作组件如何与表单组件一起使用。

<<< @demo/swipe-action/demo/Form.vue

## API

### SwipeActionProps

| 属性              | 描述           | 类型                       | 默认值 |
| ----------------- | -------------- | -------------------------- | ------ |
| root-class        | 组件根元素类名 | string                     | -      |
| root-style        | 组件根元素样式 | StyleValue                 | -      |
| disabled          | 是否禁用滑动   | boolean                    | false  |
| visible (v-model) | 控制显隐       | 'left' \| 'right' \| false | false  |

### SwipeActionSlots

| 插槽    | 描述               | 属性                   |
| ------- | ------------------ | ---------------------- |
| default | 自定义默认内容     | -                      |
| left    | 自定义左边操作按钮 | `{ hide: () => void }` |
| right   | 自定义右边操作按钮 | `{ hide: () => void }` |

### SwipeActionEmits

| 事件           | 描述               | 类型                                            |
| -------------- | ------------------ | ----------------------------------------------- |
| update:visible | 操作按钮显隐时触发 | `(visible: 'left' \| 'right' \| false) => void` |

### SwipeActionExpose

| 属性 | 描述         | 类型         |
| ---- | ------------ | ------------ |
| hide | 隐藏操作按钮 | `() => void` |

### SwipeActionGroupProps <sup>1.30+</sup>

| 属性       | 描述                         | 类型       | 默认值 |
| ---------- | ---------------------------- | ---------- | ------ |
| root-class | 组件根元素类名               | string     | -      |
| root-style | 组件根元素样式               | StyleValue | -      |
| multiple   | 是否允许同时展示多个操作按钮 | boolean    | false  |

### SwipeActionGroupSlots <sup>1.30+</sup>

| 插槽    | 描述         | 属性 |
| ------- | ------------ | ---- |
| default | 放置默认内容 | -    |

### SwipeActionGroupExpose <sup>1.30+</sup>

| 属性     | 描述             | 类型         |
| -------- | ---------------- | ------------ |
| closeAll | 关闭所有操作按钮 | `() => void` |
