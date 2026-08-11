---
title: SelectPopout
subtitle: 列表选择弹出框
group: 表单组件
version: 1.27+
---

## 介绍

组合了列表选择、弹出框组件，实现了便捷快速的选择功能。

## 引入

```js
import SelectPopout from 'sard-uniapp/components/select-popout/select-popout.vue'
```

## 代码演示

### 基础使用

使用 `v-model` 双向绑定当前值，使用 `v-model:visible` 控制弹出框显隐。

<<< @demo/select-popout/demo/Basic.vue

### 选项分组

你可以使用 `SelectOptionGroup` 组件对选项进行分组，`label` 属性为分组名。

<<< @demo/select-popout/demo/Group.vue

### 多选

设置 `multiple` 属性即可开启多选。

<<< @demo/select-popout/demo/Multiple.vue

### 显示工具栏

多选时，可是设置 `show-toolbar` 显示工具栏，工具栏提供“选择所有”和“清空选择”功能按钮，并显示当前所有的个数。

<<< @demo/select-popout/demo/Toolbar.vue

### 最多选择个数

多选时，可以设置 `multiple-limit` 属性限制最多选择个数。

<<< @demo/select-popout/demo/MultipleLimit.vue

### 禁用选项

设置选项的 `disabled` 属性，可以禁止选择此选项。

<<< @demo/select-popout/demo/Disabled.vue

### 自定义选项标签

默认选项标签只能设置文字，如果要自定义结构，可以使用选项的 `label` 插槽。

<<< @demo/select-popout/demo/CustomLabel.vue

### 自定义整个选项

如果要自定义整个选项结构，可以使用默认插槽，并设置选项的 `plain` 属性来清除默认样式。

<<< @demo/select-popout/demo/CustomOption.vue

### 筛选选项

如果选项数量太多，可以设置 `filterable` 属性显示筛选输入框；并设置 `filter-method` 属性，这个属性是一个回调函数，会在输入框值改变时触发，并接收输入框值作为参数。筛选逻辑需自行实现。

<<< @demo/select-popout/demo/Filterable.vue

### 远程

如果需要从远程服务器获取数据，可以设置 `filterable` 显示输入框，设置 `remote` 属性启动远程逻辑，设置 `remote-method` 属性处理远程数据获取逻辑。

`remote-method` 属性是一个回调函数，接收输入框值、当前页码和表示是否刷新的布尔值作为参数，并返回 `Promise<boolean>` 类型值，`Promise` 的布尔类型泛型参数表示是否已获取全部数据。

`Select` 组件远程功能使用到了 `LoadMore` 组件和 `useLoadMore` 钩子函数，会在触底时加载下一页数据。

<<< @demo/select-popout/demo/Remote.vue

## API

### SelectPopoutProps

继承 [`SelectProps`](./select#SelectProps) 并有以下额外属性：

| 属性                            | 描述                                           | 类型       | 默认值 |
| ------------------------------- | ---------------------------------------------- | ---------- | ------ |
| popout-class                    | 弹窗框根元素类名                               | string     | -      |
| popout-style                    | 弹窗框根元素样式                               | StyleValue | -      |
| visible (v-model)               | 是否显示弹出框                                 | boolean    | -      |
| title                           | 弹出框标题                                     | string     | -      |
| show-confirm <sup>1.27.1+</sup> | 单选时是否显示确定按钮，隐藏按钮可用于快捷选择 | boolean    | true   |
| validate-event                  | 是否触发表单验证                               | boolean    | true   |
| resettable                      | 关闭弹出框后，是否可复位弹出框值               | boolean    | false  |

### SelectPopoutSlots

继承 [`SelectSlots`](./select#SelectSlots)

### SelectPopoutEmits

| 事件               | 描述                        | 类型                                 |
| ------------------ | --------------------------- | ------------------------------------ |
| update:model-value | 组件值改变时触发            | `(value: any) => void`               |
| change             | 组件值改变时触发            | `(value: any) => void`               |
| update:visible     | 弹出框显隐时触发            | `(visible: boolean) => void`         |
| confirm            | 点击确定按钮时触发          | `() => void`                         |
| visible-hook       | 入场/退场动画状态改变时触发 | `(name: TransitionHookName) => void` |
| before-enter       | 入场动画开始前触发          | `() => void`                         |
| enter              | 入场动画开始时触发          | `() => void`                         |
| after-enter        | 入场动画结束时触发          | `() => void`                         |
| enter-cancelled    | 入场动画取消时触发          | `() => void`                         |
| before-leave       | 退场动画开始前触发          | `() => void`                         |
| leave              | 退场动画开始时触发          | `() => void`                         |
| after-leave        | 退场动画结束时触发          | `() => void`                         |
| leave-cancelled    | 退场动画取消时触发          | `() => void`                         |
