---
nav: 组件
title: Popout
subtitle: 弹出框
group: 数据展示
---

## 介绍

底部弹出框，可以控制组件的展示与交互，可作为其他组件的弹出框容器。

Popout 组件基于 Popup 组件。

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

如果 `beforeClose` 返回 false，则取消关闭弹出框；如果返回 `Promise` 对象，则会在 `resolve` 时才关闭弹出框。

@code('${DEMO_PATH}/popout/demo/BeforeClose.vue')

## API

### PopoutProps

| 属性                             | 描述                                                                                                              | 类型                        | 默认值  |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------- | --------------------------- | ------- |
| root-class                       | 组件根元素类名                                                                                                    | string                      | -       |
| root-style                       | 组件根元素样式                                                                                                    | StyleValue                  | -       |
| title                            | 弹出框标题                                                                                                        | string                      | -       |
| show-cancel                      | 是否显示取消按钮，适用 `loose` 类型                                                                               | boolean                     | false   |
| cancel-text                      | 取消按钮文案                                                                                                      | string                      | '取消'  |
| show-confirm                     | 是否显示确定按钮，适用 `loose` 类型                                                                               | boolean                     | true    |
| confirm-text                     | 确定按钮文案                                                                                                      | string                      | '确定'  |
| show-close                       | 是否显示关闭按钮，适用 `loose` 类型                                                                               | boolean                     | true    |
| show-footer                      | 是否显示底部按钮                                                                                                  | boolean                     | true    |
| type                             | 弹出框按钮排版方式                                                                                                | 'compact' \| 'loose'        | 'loose' |
| visible (v-model)                | 是否显示弹出框                                                                                                    | boolean                     | -       |
| before-close                     | 关闭前的回调，返回 `false` 或 `rejected` 状态的 `Promise` 可阻止关闭                                              | PopoutBeforeClose           | -       |
| duration                         | 显隐动画时长，单位 ms                                                                                             | number                      | 300     |
| overlay <sup>1.25.1+</sup>       | 是否显示遮罩                                                                                                      | boolean                     | true    |
| overlay-class <sup>1.25.1+</sup> | 添加到遮罩的类名                                                                                                  | string                      | -       |
| overlay-style <sup>1.25.1+</sup> | 添加到遮罩的样式                                                                                                  | string                      | -       |
| background <sup>1.25.1+</sup>    | 遮罩背景色                                                                                                        | string                      | -       |
| transparent <sup>1.25.1+</sup>   | 透明遮罩                                                                                                          | boolean                     | false   |
| overlay-closable                 | 点击遮罩是否关闭                                                                                                  | boolean                     | true    |
| keep-render <sup>1.24.3+</sup>   | 无论刚挂载还是隐藏，都始终不设置 display 为 none，一般用于内部包含计算尺寸的组件的情况                            | boolean                     | false   |
| back-press <sup>1.25.7+</sup>    | 弹出框显示时，劫持用户的返回操作，`close`: 关闭弹出框、`back`: 返回上一页、`stop`: 不关闭也不返回（仅小程序支持） | 'close' \| 'back' \| 'stop' | 'close' |

### PopoutBeforeClose

- 当点击确定按钮时，`type` 为 `confirm`；
- 当点击取消按钮时，`type` 为 `cancel`；
- 当点击关闭按钮或遮罩时，`type` 为 `close`。

`loading` 表示当前哪个按钮处于异步关闭状态。

```ts
type PopoutBeforeClose = (
  type: 'close' | 'cancel' | 'confirm',
  loading: {
    readonly cancel: boolean
    readonly confirm: boolean
    readonly close: boolean
  },
) => any | Promise<any>
```

### PopoutSlots

| 插槽                             | 描述                                                                                                                                                       | 属性                                                                                           |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| default                          | 自定义主体内容                                                                                                                                             | -                                                                                              |
| title                            | 自定义标题                                                                                                                                                 | -                                                                                              |
| title-prepend <sup>1.19.2+</sup> | 自定义标题前面内容                                                                                                                                         | -                                                                                              |
| cancel <sup>1.24.2+</sup>        | 自定义取消按钮内容                                                                                                                                         | { onClick: () => void; loading: boolean; visible?: boolean; text: string }                     |
| confirm <sup>1.24.2+</sup>       | 自定义确定按钮内容                                                                                                                                         | { onClick: () => void; loading: boolean; visible?: boolean; text: string; disabled?: boolean } |
| visible                          | 同默认插槽，额外接收一些判断弹出框显示状态的属性，用于小程序端多节点渲染的性能问题；`whole` 当开始显示到完全隐藏时为真，`already` 当开始显示时到以后都为真 | { whole: boolean, already: boolean }                                                           |

### PopoutEmits

| 事件                             | 描述                                                                                                              | 类型                               |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ---------------------------------- | ------- |
| update:visible                   | 显隐时触发                                                                                                        | (visible: boolean) => void         |
| close                            | 点击关闭按钮或遮罩时触发                                                                                          | () => void                         |
| cancel                           | 点击取消按钮时触发                                                                                                | () => void                         |
| confirm                          | 点击确定按钮时触发                                                                                                | () => void                         |
| back-press <sup>1.25.7+</sup>    | 弹出框显示时，劫持用户的返回操作，`close`: 关闭弹出框、`back`: 返回上一页、`stop`: 不关闭也不返回（仅小程序支持） | 'close' \| 'back' \| 'stop'        | 'close' |
| visible-hook                     | 入场/退场动画状态改变时触发                                                                                       | (name: TransitionHookName) => void |
| before-enter <sup>1.12+</sup>    | 入场动画开始前触发                                                                                                | () => void                         |
| enter <sup>1.12+</sup>           | 入场动画开始时触发                                                                                                | () => void                         |
| after-enter <sup>1.12+</sup>     | 入场动画结束时触发                                                                                                | () => void                         |
| enter-cancelled <sup>1.12+</sup> | 入场动画取消时触发                                                                                                | () => void                         |
| before-leave <sup>1.12+</sup>    | 退场动画开始前触发                                                                                                | () => void                         |
| leave <sup>1.12+</sup>           | 退场动画开始时触发                                                                                                | () => void                         |
| after-leave <sup>1.12+</sup>     | 退场动画结束时触发                                                                                                | () => void                         |
| leave-cancelled <sup>1.12+</sup> | 退场动画取消时触发                                                                                                | () => void                         |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
