---
title: KeyboardPopout
subtitle: 键盘弹出框
group: 表单组件
version: 1.30+
---

## 介绍

组合了键盘、弹出框组件，在弹出框中显示键盘。

## 引入

```js
import KeyboardPopout from 'sard-uniapp/components/keyboard-popout/keyboard-popout.vue'
```

## 代码演示

### 基础使用

使用 `v-model:visible` 控制弹出框显隐，通过 `input` 和 `delete` 事件处理输入内容。

<<< @demo/keyboard-popout/demo/Basic.vue

### 插槽

使用默认插槽可以在键盘上方添加自定义内容。

<<< @demo/keyboard-popout/demo/Slot.vue

### 类型

可以切换不同的键盘类型，在弹出框中展示数字、小数、身份证和随机数字键盘。

<<< @demo/keyboard-popout/demo/Type.vue

### 车牌号键盘

下面演示如何使用 `mode` 和 `disabled-key` 属性引导和规范化车牌号输入。

<<< @demo/keyboard-popout/demo/Plate.vue

## API

### KeyboardPopoutProps

继承 [`KeyboardProps`](./keyboard#KeyboardProps) 并有以下额外属性：

| 属性              | 描述             | 类型       | 默认值 |
| ----------------- | ---------------- | ---------- | ------ |
| visible (v-model) | 是否显示弹出框   | boolean    | -      |
| title             | 弹出框标题       | string     | -      |
| popout-class      | 弹出框根元素类名 | string     | -      |
| popout-style      | 弹出框根元素样式 | StyleValue | -      |
| transparent       | 遮罩是否透明     | boolean    | false  |
| show-cancel       | 是否显示取消按钮 | boolean    | true   |
| show-confirm      | 是否显示确定按钮 | boolean    | true   |

### KeyboardPopoutSlots

| 插槽    | 描述       | 属性 |
| ------- | ---------- | ---- |
| default | 自定义内容 | -    |

### KeyboardPopoutEmits

| 事件            | 描述                        | 类型                                     |
| --------------- | --------------------------- | ---------------------------------------- |
| update:visible  | 弹出框显隐时触发            | `(visible: boolean) => void`             |
| cancel          | 点击取消按钮时触发          | `() => void`                             |
| confirm         | 点击确定按钮时触发          | `() => void`                             |
| input           | 可输入按键点击时触发        | `(key: string) => void`                  |
| delete          | 点击删除按钮时触发          | `() => void`                             |
| toggle          | 切换车牌号中英文时触发      | `(mode: 'chinese' \| 'english') => void` |
| update:mode     | 切换车牌号中英文时触发      | `(mode: 'chinese' \| 'english') => void` |
| visible-hook    | 入场/退场动画状态改变时触发 | `(name: TransitionHookName) => void`     |
| before-enter    | 入场动画开始前触发          | `() => void`                             |
| enter           | 入场动画开始时触发          | `() => void`                             |
| after-enter     | 入场动画结束时触发          | `() => void`                             |
| enter-cancelled | 入场动画取消时触发          | `() => void`                             |
| before-leave    | 退场动画开始前触发          | `() => void`                             |
| leave           | 退场动画开始时触发          | `() => void`                             |
| after-leave     | 退场动画结束时触发          | `() => void`                             |
| leave-cancelled | 退场动画取消时触发          | `() => void`                             |

### KeyboardPopoutExpose

| 属性    | 描述                 | 类型                                      |
| ------- | -------------------- | ----------------------------------------- |
| shuffle | 重新打乱随机数字键盘 | `() => void`                              |
| toggle  | 切换车牌号中英文键盘 | `(mode?: 'chinese' \| 'english') => void` |
