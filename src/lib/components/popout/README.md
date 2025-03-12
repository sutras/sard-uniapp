---
nav: 组件
title: Popout
subtitle: 弹出框
group: 数据展示
---

## 介绍

底部弹出框，可以控制组件的展示与交互，可作为其他组件的弹出框容器。

## 引入

```ts
import Popout from 'sard-uniapp/components/popout/popout.vue'
```

## 代码演示

### 基础使用

使用 `visible`属性控制显隐，使用 `title` 属性设置标题。

@code('${DEMO_PATH}/popout/demo/Basic.vue')

### 紧凑类型

通过将 `type` 设为 `compact` 可以将确定/取消按钮放到标题两侧，以便节省空间。

@code('${DEMO_PATH}/popout/demo/Compact.vue')

### 异步关闭

通过 `beforeClose` 属性可以传入一个回调函数，在弹窗关闭前进行特定操作。

@code('${DEMO_PATH}/popout/demo/BeforeClose.vue')

## API

### PopoutProps

| 属性              | 描述                                                      | 类型                                                                             | 默认值  |
| ----------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------- | ------- |
| root-class        | 组件根元素类名                                            | string                                                                           | -       |
| root-style        | 组件根元素样式                                            | StyleValue                                                                       | -       |
| title             | 弹出框标题                                                | string                                                                           | -       |
| show-cancel       | 是否显示取消按钮，适用 `loose` 类型                       | boolean                                                                          | false   |
| cancel-text       | 取消按钮文案                                              | string                                                                           | '取消'  |
| show-confirm      | 是否显示确定按钮，适用 `loose` 类型                       | boolean                                                                          | true    |
| confirm-text      | 确定按钮文案                                              | string                                                                           | '确定'  |
| show-close        | 是否显示关闭按钮，适用 `loose` 类型                       | boolean                                                                          | true    |
| show-footer       | 是否显示底部按钮                                          | boolean                                                                          | true    |
| type              | 弹出框按钮排版方式                                        | 'compact' \| 'loose'                                                             | 'loose' |
| visible (v-model) | 是否显示弹出框                                            | boolean                                                                          | -       |
| duration          | 显隐动画时长，单位 ms                                     | number                                                                           | 300     |
| overlay-closable  | 点击遮罩是否关闭                                          | boolean                                                                          | true    |
| before-close      | 关闭前的回调，返回 `false` 可阻止关闭，支持返回 `Promise` | (type: 'close' \| 'cancel' \| 'confirm') => boolean \| undefined \| Promise<any> | -       |

### PopoutSlots

| 插槽    | 描述                                                                                                                                                       | 属性                                 |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| default | 自定义主体内容                                                                                                                                             | -                                    |
| title   | 自定义标题                                                                                                                                                 | -                                    |
| cancel  | 自定义确定按钮内容                                                                                                                                         | -                                    |
| confirm | 自定义取消按钮内容                                                                                                                                         | -                                    |
| visible | 同默认插槽，额外接收一些判断弹出框显示状态的属性，用于小程序端多节点渲染的性能问题；`whole` 当开始显示到完全隐藏时为真，`already` 当开始显示时到以后都为真 | { whole: boolean, already: boolean } |

### PopoutEmits

| 事件                             | 描述                        | 类型                               |
| -------------------------------- | --------------------------- | ---------------------------------- |
| update:visible                   | 显隐时触发                  | (visible: boolean) => void         |
| close                            | 点击关闭按钮或遮罩时触发    | () => void                         |
| cancel                           | 点击取消按钮时触发          | () => void                         |
| confirm                          | 点击确定按钮时触发          | () => void                         |
| visible-hook                     | 入场/退场动画状态改变时触发 | (name: TransitionHookName) => void |
| before-enter <sup>1.12+</sup>    | 入场动画开始前触发          | () => void                         |
| enter <sup>1.12+</sup>           | 入场动画开始时触发          | () => void                         |
| after-enter <sup>1.12+</sup>     | 入场动画结束时触发          | () => void                         |
| enter-cancelled <sup>1.12+</sup> | 入场动画取消时触发          | () => void                         |
| before-leave <sup>1.12+</sup>    | 退场动画开始前触发          | () => void                         |
| leave <sup>1.12+</sup>           | 退场动画开始时触发          | () => void                         |
| after-leave <sup>1.12+</sup>     | 退场动画结束时触发          | () => void                         |
| leave-cancelled <sup>1.12+</sup> | 退场动画取消时触发          | () => void                         |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
