---
nav: 组件
title: ActionSheet
subtitle: 动作面板
group:
  title: 反馈组件
  order: 5
---

## 介绍

从底部向上弹出动作菜单。

## 引入

```ts
import ActionSheet from 'sard-uniapp/components/action-sheet/action-sheet.vue'
import ActionSheetAgent from 'sard-uniapp/components/action-sheet-agent/action-sheet-agent.vue'
import { actionSheet } from 'sard-uniapp'
```

## 代码演示

### 基础使用

使用 `v-model:visible` 属性控制显隐，使用 `itemList` 属性配置动作项。

@code('${DEMO_PATH}/action-sheet/demo/Basic.vue')

### 取消按钮

设置 `show-cancel` 属性展示取消按钮，或者使用 `cancel` 属性在设置取消按钮文本的同时显示取消按钮。

@code('${DEMO_PATH}/action-sheet/demo/Cancel.vue')

### 描述信息

使用 `description` 属性对整个动作面板做一个解释说明。使用动作项的 `description` 属性对某个动作做一个解释说明。

@code('${DEMO_PATH}/action-sheet/demo/Description.vue')

### 动作状态

每个动作项都可以配置 `color`、`disabled`、`loading` 等属性来展示当前的状态。

@code('${DEMO_PATH}/action-sheet/demo/Status.vue')

### 命令式 <sup>1.25.6+</sup>

先在页面放置代理组件。

```tsx
<sar-action-sheet-agent />
```

接着便可以使用 `actionSheet` 方法显示动作面板。

@code('${DEMO_PATH}/action-sheet/demo/Imperative.vue')

## API

### ActionSheetProps

| 属性                           | 描述                                                                 | 类型                   | 默认值 |
| ------------------------------ | -------------------------------------------------------------------- | ---------------------- | ------ |
| root-class                     | 组件根元素类名                                                       | string                 | -      |
| root-style                     | 组件根元素样式                                                       | StyleValue             | -      |
| description                    | 动作面板描述说明                                                     | string                 | -      |
| item-list                      | 面板项列表                                                           | ActionSheetItem[]      | []     |
| show-cancel <sup>1.25.6+</sup> | 是否显示取消按钮                                                     | boolean                | false  |
| cancel                         | 自定义取消按钮文字                                                   | string                 | -      |
| visible                        | 是否显示动作面板                                                     | boolean                | false  |
| overlay-closable               | 点击遮罩后是否关闭                                                   | boolean                | true   |
| before-close                   | 关闭前的回调，返回 `false` 或 `rejected` 状态的 `Promise` 可阻止关闭 | ActionSheetBeforeClose | -      |
| duration                       | 显隐动画时长，单位 ms                                                | number                 | 300    |

#### ActionSheetBeforeClose

```ts
type ActionSheetBeforeClose =
  | ((
      type: 'close' | 'cancel',
      loading: {
        readonly cancel: boolean
        readonly select: boolean
        readonly close: boolean
      },
    ) => any | Promise<any>)
  | ((
      type: 'select',
      item: ActionSheetItem,
      index: number,
      loading: {
        readonly cancel: boolean
        readonly select: boolean
        readonly close: boolean
      },
    ) => any | Promise<any>)
```

- 当点击动作项时，`type` 为 `select`；
- 当点击取消按钮时，`type` 为 `cancel`；
- 当点击遮罩时，`type` 为 `close`。

`loading` 表示当前哪个按钮处于异步关闭状态。

### ActionSheetItem

| 属性        | 描述           | 类型    | 默认值 |
| ----------- | -------------- | ------- | ------ |
| name        | 动作名称       | string  | -      |
| description | 动作的描述说明 | string  | -      |
| color       | 字体颜色       | string  | -      |
| disabled    | 禁用状态       | boolean | false  |
| loading     | 加载状态       | boolean | false  |

### ActionSheetEmits

| 事件                               | 描述                        | 类型                                           |
| ---------------------------------- | --------------------------- | ---------------------------------------------- |
| update:visible                     | 动作面板显隐时触发          | (visible: boolean) => void                     |
| close                              | 点击遮罩时触发              | () => void                                     |
| cancel                             | 点击取消按钮时触发          | () => void                                     |
| select                             | 点击动作按钮时触发          | (item: ActionSheetItem, index: number) => void |
| visible-hook <sup>1.22.1+</sup>    | 入场/退场动画状态改变时触发 | (name: TransitionHookName) => void             |
| before-enter <sup>1.22.1+</sup>    | 入场动画开始前触发          | () => void                                     |
| enter <sup>1.22.1+</sup>           | 入场动画开始时触发          | () => void                                     |
| after-enter <sup>1.22.1+</sup>     | 入场动画结束时触发          | () => void                                     |
| enter-cancelled <sup>1.22.1+</sup> | 入场动画取消时触发          | () => void                                     |
| before-leave <sup>1.22.1+</sup>    | 退场动画开始前触发          | () => void                                     |
| leave <sup>1.22.1+</sup>           | 退场动画开始时触发          | () => void                                     |
| after-leave <sup>1.22.1+</sup>     | 退场动画结束时触发          | () => void                                     |
| leave-cancelled <sup>1.22.1+</sup> | 退场动画取消时触发          | () => void                                     |

### ActionSheetAgentProps / ActionSheetOptions <sup>1.25.6+</sup>

继承 [`ActionSheetProps`](#ActionSheetProps) 并有以下额外属性。

| 属性             | 描述                        | 类型                                           | 默认值        |
| ---------------- | --------------------------- | ---------------------------------------------- | ------------- |
| id               | 动作面板组件的 id           | string                                         | 'actionSheet' |
| onClose          | 点击遮罩时调用              | () => void                                     |
| onCancel         | 点击取消按钮时调用          | () => void                                     |
| onSelect         | 点击动作项时调用            | (item: ActionSheetItem, index: number) => void |
| onVisibleHook    | 入场/退场动画状态改变时调用 | (name: TransitionHookName) => void             |
| onBeforeEnter    | 入场动画开始前调用          | () => void                                     |
| onEnter          | 入场动画开始时调用          | () => void                                     |
| onAfterEnter     | 入场动画结束时调用          | () => void                                     |
| onEnterCancelled | 入场动画取消时调用          | () => void                                     |
| onBeforeLeave    | 退场动画开始前调用          | () => void                                     |
| onLeave          | 退场动画开始时调用          | () => void                                     |
| onAfterLeave     | 退场动画结束时调用          | () => void                                     |
| onLeaveCancelled | 退场动画取消时调用          | () => void                                     |

### ActionSheetAgentEmits <sup>1.25.6+</sup>

继承 [`ActionSheetEmits`](#ActionSheetEmits)。

### 命令式方法 <sup>1.25.6+</sup>

| 名称        | 描述                           | 类型                         |
| ----------- | ------------------------------ | ---------------------------- |
| actionSheet | 显示动作面板                   | ActionSheetFunction          |
| hide        | 隐藏指定 `id` 的命令式动作面板 | (id = 'actionSheet') => void |
| hideAll     | 隐藏所有命令式动作面板         | () => void                   |

### ActionSheetFunction <sup>1.25.6+</sup>

```ts
type ActionSheetFunction = ActionSheetSimpleShowFunction & {
  hide: (id?: string) => void
  hideAll: () => void
}
```

### ActionSheetSimpleShowFunction <sup>1.25.6+</sup>

```ts
interface ActionSheetSimpleShowFunction {
  (options: ActionSheetOptions): void
}
```

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
