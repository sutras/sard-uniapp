---
nav: 组件
title: Notify
subtitle: 消息通知
group: 反馈组件
---

## 介绍

在页面顶部展示消息通知。

## 引入

```ts
import Notify from 'sard-uniapp/components/notify/notify.vue'
import NotifyAgent from 'sard-uniapp/components/notify-agent/notify-agent.vue'
import { notify } from 'sard-uniapp'
```

## 代码演示

### 基础使用

先在页面放置代理组件。

```tsx
<sar-notify-agent />
```

接着便可以使用 `notify` 等方法显示提示。

@code('${DEMO_PATH}/notify/demo/Basic.vue')

### 类型

支持 `primary、success、warning、error` 四种通知类型，默认为 `primary`

@code('${DEMO_PATH}/notify/demo/Type.vue')

### 自定义颜色

通过 `color` 属性设置文本颜色，通过 `background` 属性设置背景色。

@code('${DEMO_PATH}/notify/demo/Color.vue')

### 自定义时长

`timeout` 设为 0 后会一直显示。

@code('${DEMO_PATH}/notify/demo/Duration.vue')

### 自定义位置

通知允许在屏幕上边或下边展示。

@code('${DEMO_PATH}/notify/demo/Placement.vue')

## API

### NotifyProps

| 属性                        | 描述                                        | 类型                                           | 默认值    |
| --------------------------- | ------------------------------------------- | ---------------------------------------------- | --------- |
| type                        | 加载类型                                    | 'primary' \| 'success' \| 'warning' \| 'error' | 'primary' |
| message                     | 通知内容                                    | string                                         | -         |
| color                       | 字体颜色                                    | string                                         | -         |
| background                  | 背景色                                      | string                                         | -         |
| visible (v-model)           | 是否显示通知                                | boolean                                        | -         |
| position                    | 通知放置的位置                              | 'top' \| 'bottom'                              | 'top'     |
| timeout                     | 展示时长(ms)，值为 0 时，通知不会消失       | number                                         | 3000      |
| duration                    | 显隐动画时长，单位 ms                       | number                                         | 300       |
| status-bar <sup>1.12+</sup> | 是否包含状态栏，自定义导航栏时应设为 `true` | boolean                                        | false     |

### NotifySlots <sup>1.20.2+</sup>

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### NotifyEmits

| 事件                               | 描述                        | 类型                               |
| ---------------------------------- | --------------------------- | ---------------------------------- |
| update:visible                     | 通知框显隐时触发            | (visible: boolean) => void         |
| click <sup>1.20.2+</sup>           | 点击通知框时触发            | (event: any) => void               |
| visible-hook <sup>1.20.2+</sup>    | 入场/退场动画状态改变时触发 | (name: TransitionHookName) => void |
| before-enter <sup>1.20.2+</sup>    | 入场动画开始前触发          | () => void                         |
| enter <sup>1.20.2+</sup>           | 入场动画开始时触发          | () => void                         |
| after-enter <sup>1.20.2+</sup>     | 入场动画结束时触发          | () => void                         |
| enter-cancelled <sup>1.20.2+</sup> | 入场动画取消时触发          | () => void                         |
| before-leave <sup>1.20.2+</sup>    | 退场动画开始前触发          | () => void                         |
| leave <sup>1.20.2+</sup>           | 退场动画开始时触发          | () => void                         |
| after-leave <sup>1.20.2+</sup>     | 退场动画结束时触发          | () => void                         |
| leave-cancelled <sup>1.20.2+</sup> | 退场动画取消时触发          | () => void                         |

### NotifyAgentProps / NotifyOptions

继承 [`NotifyProps`](#NotifyProps) 并有以下额外属性。

| 属性                                | 描述                        | 类型                               | 默认值   |
| ----------------------------------- | --------------------------- | ---------------------------------- | -------- |
| id                                  | 通知组件的 id               | string                             | 'notify' |
| onVisibleHook <sup>1.20.2+</sup>    | 入场/退场动画状态改变时调用 | (name: TransitionHookName) => void |
| onBeforeEnter <sup>1.20.2+</sup>    | 入场动画开始前调用          | () => void                         |
| onEnter <sup>1.20.2+</sup>          | 入场动画开始时调用          | () => void                         |
| onAfterEnter <sup>1.20.2+</sup>     | 入场动画结束时调用          | () => void                         |
| onEnterCancelled <sup>1.20.2+</sup> | 入场动画取消时调用          | () => void                         |
| onBeforeLeave <sup>1.20.2+</sup>    | 退场动画开始前调用          | () => void                         |
| onLeave <sup>1.20.2+</sup>          | 退场动画开始时调用          | () => void                         |
| onAfterLeave <sup>1.20.2+</sup>     | 退场动画结束时调用          | () => void                         |
| onLeaveCancelled <sup>1.20.2+</sup> | 退场动画取消时调用          | () => void                         |

### NotifyAgentEmits <sup>1.20.2+</sup>

继承 [`NotifyEmits`](#NotifyEmits)。

### 命令式方法

| 名称           | 描述                       | 类型                     |
| -------------- | -------------------------- | ------------------------ |
| notify         | 显示通知                   | NotifyFunction           |
| notify.success | 显示成功类型通知           | NotifySimpleShowFunction |
| notify.warning | 显示警告类型通知           | NotifySimpleShowFunction |
| notify.error   | 显示错误类型通知           | NotifySimpleShowFunction |
| notify.hide    | 隐藏指定 `id` 的命令式通知 | (id = 'notify') => void  |
| notify.hideAll | 隐藏所有命令式通知         | () => void               |

### NotifyFunction

```ts
type NotifyFunction = NotifySimpleShowFunction & {
  success: NotifySimpleShowFunction
  warning: NotifySimpleShowFunction
  error: NotifySimpleShowFunction
  hide: (id?: string) => void
  hideAll: () => void
}
```

### NotifySimpleShowFunction

```ts
interface NotifySimpleShowFunction {
  (options: NotifyOptions): void
  (message: string, options?: NotifyOptions): void
}
```

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
