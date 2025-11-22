---
nav: 组件
title: PickerInput
subtitle: 选择器输入框
group: 表单组件
---

## 介绍

组合了选择器弹出框、输入框组件，实现了便捷快速的选择功能。

## 引入

```ts
import PickerInput from 'sard-uniapp/components/picker-input/picker-input.vue'
```

## 代码演示

### 基础使用

使用 `v-model` 绑定当前值，通过 `title` 和 `placeholder` 属性设置弹出框标题和输入框占位文本。

在点击输入框后会显示包裹选择器的弹出框。

@code('${DEMO_PATH}/picker-input/demo/Basic.vue')

### 级联选择

@code('${DEMO_PATH}/picker-input/demo/Cascaded.vue')

## API

### PickerInputProps

继承 [`PickerPopoutProps`](./picker-popout#PickerPopoutProps) 并有以下额外属性：

| 属性                              | 描述                   | 类型       | 默认值          |
| --------------------------------- | ---------------------- | ---------- | --------------- |
| root-class                        | 弹出式输入框根元素类名 | string     | -               |
| root-style                        | 弹出式输入框根元素样式 | StyleValue | -               |
| disabled                          | 禁用状态               | boolean    | false           |
| readonly                          | 只读状态               | boolean    | false           |
| loading                           | 加载状态               | boolean    | false           |
| clearable                         | 是否显示清空按钮       | boolean    | false           |
| placeholder                       | 输入框占位符内容       | string     | -               |
| value-on-clear <sup>1.19.2+</sup> | 设置点击清除按钮后的值 | () => any  | () => undefined |
| arrow <sup>1.22+</sup>            | 自定义箭头图标名       | string     | 'caret-right'   |
| arrow-family <sup>1.22+</sup>     | 自定义箭头图标字体     | string     | 'sari'          |
| input-props <sup>1.22+</sup>      | 自定义输入框组件属性   | InputProps | -               |

### PickerInputSlots

继承 [`PickerPopoutSlots`](./picker-popout#PickerPopoutSlots)和[`PopoutInputSlots`](./popout-input#PopoutInputSlots)

### PickerInputEmits

继承 [`PickerPopoutEmits`](./picker-popout#PickerPopoutEmits) 并有以下额外属性：
