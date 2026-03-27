---
title: SelectInput
subtitle: 列表选择输入框
group: 表单组件
version: 1.27+
---

## 介绍

组合了列表选择弹出框、输入框组件，实现了便捷快速的选择功能。

## 引入

```js
import SelectInput from 'sard-uniapp/components/select-input/select-input.vue'
```

## 代码演示

### 基础使用

使用 `v-model` 绑定当前值，通过 `title` 和 `placeholder` 属性设置弹出框标题和输入框占位文本。

在点击输入框后会显示列表选择弹出框。

相比较于 `Select` 和 `SelectPopout` 组件，`SelectInput` 组件需要传递 `options` 属性，因为需要通过此属性获取当前值对应的标签，以便显示在输入框内。

<<< @demo/select-input/demo/Basic.vue

### 自定义插槽

`SelectInput` 组件依然可以像 `Select` 和 `SelectPopout` 组件一样使用插槽自定义内容。

但 `options` 属性还是必传的。

<<< @demo/select-input/demo/Custom.vue

### 多选

默认选择的选项的标签最多 10 会显示在输入框，其余通过 `+<rest>` 的形式展示。可以通过 `max-labels` 属性设置最多展示的标签数。

<<< @demo/select-input/demo/Multiple.vue

### 远程

远程的使用参考 `SelectPopout` ，不多赘述。

当远程数据没有加载时，输入框会显示对应的 `value` 值。值的已加载的标签会被缓存起来，后续筛选清空列表时也能显示缓存的标签。

<<< @demo/select-input/demo/Remote.vue

## API

### SelectInputProps

继承 [`SelectPopoutProps`](./select-popout#SelectPopoutProps) 并有以下额外属性：

| 属性       | 描述                                               | 类型   | 默认值 |
| ---------- | -------------------------------------------------- | ------ | ------ |
| max-labels | 多选时，输入框最大展示标签个数，设为 -1 表示不限制 | number | 10     |

### SelectInputSlots

继承 [`SelectPopoutSlots`](./select-popout#SelectPopoutSlots)和[`PopoutInputSlots`](./popout-input#PopoutInputSlots)

### SelectInputEmits

继承 [`SelectPopoutEmits`](./select-popout#SelectPopoutEmits)
