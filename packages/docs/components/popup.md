---
title: Popup
subtitle: 弹出层
group: 数据展示
---

## 介绍

所有可弹出组件的底层组件，可自定义弹出方向和内容。后弹出的弹出层总是比之前的层级要大。

## 引入

```js
import Popup from 'sard-uniapp/components/popup/popup.vue'
```

## 代码演示

### 基础使用

使用 `visible` 控制显隐，使用 `effect` 控制显隐效果。

<<< @demo/popup/demo/Basic.vue

### 命令式 <sup>1.30.3+</sup>

先在页面放置代理组件。

```tsx
<sar-popup-agent></sar-popup-agent>
```

接着便可以使用 `popup` 方法显示弹出层。

如果需要显示多个命令式弹出层，可以给代理组件设置 `id`，在调用 `popup` 方法时传入相同的 `id` 来使用对应的代理组件。

<<< @demo/popup/demo/Imperative.vue

## API

### PopupProps

| 属性                              | 描述                                                                                      | 类型                                                                               | 默认值  |
| --------------------------------- | ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ------- |
| root-class                        | 组件根元素类名                                                                            | string                                                                             | -       |
| root-style                        | 组件根元素样式                                                                            | StyleValue                                                                         | -       |
| visible (v-model)                 | 是否可见                                                                                  | boolean                                                                            | false   |
| duration                          | 显隐动画时长，单位 ms                                                                     | number                                                                             | 300     |
| effect                            | 显隐效果                                                                                  | 'slide-top' \| 'slide-right' \| 'slide-bottom' \| 'slide-left' \| 'zoom' \| 'fade' | 'fade'  |
| overlay                           | 是否显示遮罩                                                                              | boolean                                                                            | true    |
| overlay-class                     | 添加到遮罩的类名                                                                          | string                                                                             | -       |
| overlay-style                     | 添加到遮罩的样式                                                                          | string                                                                             | -       |
| background                        | 遮罩背景色                                                                                | string                                                                             | -       |
| transparent                       | 透明遮罩                                                                                  | boolean                                                                            | false   |
| overlay-closable <sup>1.22+</sup> | 是否在点击遮罩层后关闭                                                                    | boolean                                                                            | true    |
| keep-render <sup>1.24.3+</sup>    | 无论刚挂载还是隐藏，都始终不设置 display 为 none，一般用于内部包含计算尺寸的组件的情况    | boolean                                                                            | false   |
| lock-scroll <sup>1.25.5+</sup>    | 弹出框显示时，是否阻止页面滚动                                                            | boolean                                                                            | true    |
| back-press <sup>1.25.7+</sup>     | 弹出框显示时，劫持用户的返回操作，`close`: 关闭弹出框、`back`: 返回上一页（仅小程序支持） | 'close' \| 'back'                                                                  | 'close' |

### PopupSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### PopupEmits

| 事件                            | 描述                                                   | 类型                                 |
| ------------------------------- | ------------------------------------------------------ | ------------------------------------ |
| overlay-click                   | 点击遮罩时触发                                         | `(event: any) => void`               |
| update:visible <sup>1.22+</sup> | 显隐时触发                                             | `(visible: boolean) => void`         |
| back-press <sup>1.25.7+</sup>   | 用户进行返回操作时触发，仅限于 `close`（仅小程序支持） | `() => void`                         |
| visible-hook                    | 入场/退场动画状态改变时触发                            | `(name: TransitionHookName) => void` |
| before-enter                    | 入场动画开始前触发                                     | `() => void`                         |
| enter                           | 入场动画开始时触发                                     | `() => void`                         |
| after-enter                     | 入场动画结束时触发                                     | `() => void`                         |
| enter-cancelled                 | 入场动画取消时触发                                     | `() => void`                         |
| before-leave                    | 退场动画开始前触发                                     | `() => void`                         |
| leave                           | 退场动画开始时触发                                     | `() => void`                         |
| after-leave                     | 退场动画结束时触发                                     | `() => void`                         |
| leave-cancelled                 | 退场动画取消时触发                                     | `() => void`                         |

### PopupAgentProps / PopupOptions <sup>1.30.3+</sup>

继承 [`ToastProps`](#ToastProps) 并有以下额外属性。

| 属性             | 描述                        | 类型                                 | 默认值  |
| ---------------- | --------------------------- | ------------------------------------ | ------- |
| id               | 弹出层组件的 id             | string                               | 'popup' |
| onOverlayClick   | 点击遮罩时调用              | `() => void`                         |
| onVisibleHook    | 入场/退场动画状态改变时调用 | `(name: TransitionHookName) => void` |
| onBeforeEnter    | 入场动画开始前调用          | `() => void`                         |
| onEnter          | 入场动画开始时调用          | `() => void`                         |
| onAfterEnter     | 入场动画结束时调用          | `() => void`                         |
| onEnterCancelled | 入场动画取消时调用          | `() => void`                         |
| onBeforeLeave    | 退场动画开始前调用          | `() => void`                         |
| onLeave          | 退场动画开始时调用          | `() => void`                         |
| onAfterLeave     | 退场动画结束时调用          | `() => void`                         |
| onLeaveCancelled | 退场动画取消时调用          | `() => void`                         |

### PopupAgentSlots <sup>1.30.3+</sup>

继承 [`PopupSlots`](#PopupSlots)。

### PopupAgentEmits <sup>1.30.3+</sup>

继承 [`PopupEmits`](#PopupEmits)。

### 命令式方法 <sup>1.30.3+</sup>

| 名称          | 描述                         | 类型                     |
| ------------- | ---------------------------- | ------------------------ |
| popup         | 显示对话框                   | PopupFunction            |
| popup.hide    | 隐藏指定 `id` 的命令式对话框 | `(id = 'popup') => void` |
| popup.hideAll | 隐藏所有命令式对话框         | `() => void`             |

### PopupFunction

```ts
type PopupFunction = PopupShowFunction & {
  hide: (id?: string) => void
  hideAll: () => void
}
```

### PopupShowFunction

```ts
interface PopupShowFunction {
  (options?: PopupOptions): void
}
```

## 主题定制

### CSS 变量

<<< @comp/popup/variables.scss#variables
