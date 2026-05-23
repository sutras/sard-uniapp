---
title: ShareSheet
subtitle: 分享面板
group: 反馈组件
---

## 介绍

从底部向上弹出分享菜单。

## 引入

```js
import ShareSheet from 'sard-uniapp/components/share-sheet/share-sheet.vue'
import ShareSheetItem from 'sard-uniapp/components/share-sheet/share-sheet-item.vue'
import ShareSheetRow from 'sard-uniapp/components/share-sheet-row/share-sheet-row.vue'
import ShareSheetAgent from 'sard-uniapp/components/share-sheet-agent/share-sheet-agent.vue'
import { shareSheet } from 'sard-uniapp'
```

## 代码演示

### 基础使用

使用 `v-model:visible` 属性控制显隐，使用 `itemList` 属性配置分享项。

<<< @demo/share-sheet/demo/Basic.vue

### 取消按钮 <sup>1.30.3+</sup>

设置 `show-cancel` 属性展示取消按钮，或者使用 `cancel` 属性在设置取消按钮文本的同时显示取消按钮。

<<< @demo/share-sheet/demo/Cancel.vue

### 多行

`itemList` 属性值如果是二维数组则渲染成多行。

<<< @demo/share-sheet/demo/MultipleRow.vue

### 标题和描述

使用 `title` 和 `description` 配置标题和描述。

<<< @demo/share-sheet/demo/TitleDescription.vue

### 图片类型图标

`icon` 属性可以是图片路径。

<<< @demo/share-sheet/demo/Picture.vue

### 禁用

禁用的选项不可点击。

<<< @demo/share-sheet/demo/Disabled.vue

### 命令式 <sup>1.30.3+</sup>

先在页面放置代理组件。

```tsx
<sar-share-sheet-agent />
```

接着便可以使用 `shareSheet` 方法显示分享面板。

如果需要显示多个命令式分享面板，可以给代理组件设置 `id`，在调用 `shareSheet` 方法时传入相同的 `id` 来使用对应的代理组件。

<<< @demo/share-sheet/demo/Imperative.vue

### 插槽 <sup>1.30.3+</sup>

可以使用插槽自定义内容，包括标题、描述、取消按钮等。
也可以使用默认插槽自定义分享项，此时需要使用 `share-sheet-item` 和 `share-sheet-row` 组件来构建分享项的布局。

可使用 `share-sheet` 或者 `share-sheet-agent` 组件的插槽自定义内容。

<<< @demo/share-sheet/demo/Slot.vue

## API

### ShareSheetProps

继承 [`PopupProps`](./popup#PopupProps) 并有以下额外属性：

| 属性              | 描述                                                                 | 类型                                                                  | 默认值 |
| ----------------- | -------------------------------------------------------------------- | --------------------------------------------------------------------- | ------ |
| root-class        | 组件根元素类名                                                       | string                                                                | -      |
| root-style        | 组件根元素样式                                                       | StyleValue                                                            | -      |
| item-list         | 面板选项列表                                                         | ShareSheetItemProps[] \| ShareSheetItemProps[][]                      | []     |
| title             | 面板标题                                                             | string                                                                | -      |
| description       | 面板描述                                                             | string                                                                | -      |
| cancel            | 取消按钮内容                                                         | string                                                                | -      |
| visible (v-model) | 面板是否可见                                                         | boolean                                                               | -      |
| overlay-closable  | 点击遮罩后是否关闭                                                   | boolean                                                               | true   |
| before-close      | 关闭前的回调，返回 `false` 或 `rejected` 状态的 `Promise` 可阻止关闭 | `(type: 'close' \| 'cancel' \| 'select') => boolean \| Promise\<any>` | -      |
| duration          | 显隐动画时长，单位 ms                                                | number                                                                | 300    |

### ShareSheetSlots <sup>1.30.3+</sup>

| 插槽        | 描述               | 属性 |
| ----------- | ------------------ | ---- |
| default     | 自定义默认内容     | -    |
| description | 自定义描述         | -    |
| title       | 自定义标题         | -    |
| cancel      | 自定义取消按钮内容 | -    |

### ShareSheetEmits

| 事件                               | 描述                        | 类型                                  |
| ---------------------------------- | --------------------------- | ------------------------------------- |
| update:visible                     | 分享面板显隐时触发          | `(visible: boolean) => void`          |
| close                              | 点击遮罩时触发              | `() => void`                          |
| cancel                             | 点击取消按钮时触发          | `() => void`                          |
| select                             | 点击分享项时触发            | `(item: ShareSheetItemProps) => void` |
| visible-hook <sup>1.22.1+</sup>    | 入场/退场动画状态改变时触发 | `(name: TransitionHookName) => void`  |
| before-enter <sup>1.22.1+</sup>    | 入场动画开始前触发          | `() => void`                          |
| enter <sup>1.22.1+</sup>           | 入场动画开始时触发          | `() => void`                          |
| after-enter <sup>1.22.1+</sup>     | 入场动画结束时触发          | `() => void`                          |
| enter-cancelled <sup>1.22.1+</sup> | 入场动画取消时触发          | `() => void`                          |
| before-leave <sup>1.22.1+</sup>    | 退场动画开始前触发          | `() => void`                          |
| leave <sup>1.22.1+</sup>           | 退场动画开始时触发          | `() => void`                          |
| after-leave <sup>1.22.1+</sup>     | 退场动画结束时触发          | `() => void`                          |
| leave-cancelled <sup>1.22.1+</sup> | 退场动画取消时触发          | `() => void`                          |

### ShareSheetRowProps <sup>1.30.3+</sup>

| 属性       | 描述       | 类型       | 默认值 |
| ---------- | ---------- | ---------- | ------ |
| root-class | 行元素类名 | string     | -      |
| root-style | 行元素样式 | StyleValue | -      |

### ShareSheetRowSlots <sup>1.30.3+</sup>

| 插槽    | 描述   | 属性 |
| ------- | ------ | ---- |
| default | 行内容 | -    |

### ShareSheetItemProps <sup>1.30.3+</sup>

| 属性                     | 描述                               | 类型    | 默认值 |
| ------------------------ | ---------------------------------- | ------- | ------ |
| name                     | 标签，同 `label`，建议使用 `label` | string  | -      |
| label <sup>1.30.3+</sup> | 标签                               | string  | -      |
| value <sup>1.30.3+</sup> | 值                                 | any     | -      |
| description              | 描述                               | string  | -      |
| color                    | 图标颜色                           | string  | -      |
| background               | 图标背景颜色                       | string  | -      |
| icon                     | 图标名称，可以是图片路径           | string  | -      |
| iconFamily               | 图标字体                           | string  | -      |
| disabled                 | 禁用状态                           | boolean | false  |

### ShareSheetItemSlots <sup>1.30.3+</sup>

| 插槽        | 描述       | 属性 |
| ----------- | ---------- | ---- |
| default     | 分享项内容 | -    |
| description | 分享项描述 | -    |
| icon        | 分享项图标 | -    |
| label       | 分享项标签 | -    |

### ShareSheetItemEmits <sup>1.30.3+</sup>

| 事件  | 描述             | 类型         |
| ----- | ---------------- | ------------ |
| click | 点击分享项时触发 | `() => void` |

### ShareSheetAgentProps / ShareSheetOptions <sup>1.30.3+</sup>

继承 [`ShareSheetProps`](#ShareSheetProps) 并有以下额外属性。

| 属性             | 描述                        | 类型                                  | 默认值       |
| ---------------- | --------------------------- | ------------------------------------- | ------------ |
| id               | 分享面板组件的 id           | string                                | 'shareSheet' |
| onClose          | 点击遮罩时调用              | `() => void`                          |
| onCancel         | 点击取消按钮时调用          | `() => void`                          |
| onSelect         | 点击菜单项时调用            | `(item: ShareSheetItemProps) => void` |
| onVisibleHook    | 入场/退场动画状态改变时调用 | `(name: TransitionHookName) => void`  |
| onBeforeEnter    | 入场动画开始前调用          | `() => void`                          |
| onEnter          | 入场动画开始时调用          | `() => void`                          |
| onAfterEnter     | 入场动画结束时调用          | `() => void`                          |
| onEnterCancelled | 入场动画取消时调用          | `() => void`                          |
| onBeforeLeave    | 退场动画开始前调用          | `() => void`                          |
| onLeave          | 退场动画开始时调用          | `() => void`                          |
| onAfterLeave     | 退场动画结束时调用          | `() => void`                          |
| onLeaveCancelled | 退场动画取消时调用          | `() => void`                          |

### ShareSheetAgentSlots <sup>1.30.3+</sup>

继承 [`ShareSheetSlots`](#ShareSheetSlots)。

### ShareSheetAgentEmits <sup>1.30.3+</sup>

继承 [`ShareSheetEmits`](#ShareSheetEmits)。

## 主题定制

### CSS 变量

<<< @comp/share-sheet/variables.scss#variables
