---
nav: 组件
title: CascaderInput
subtitle: 级联输入框
group: 表单组件
---

## 介绍

组合了级联弹出框、输入框组件，实现了便捷快速的级联选择功能。

## 引入

```ts
import CascaderInput from 'sard-uniapp/components/cascader-input/cascader-input.vue'
```

## 代码演示

### 基础使用

使用 `v-model` 绑定当前值，通过 `title` 和 `placeholder` 属性设置弹出框标题和输入框占位文本。

在点击输入框后会显示级联弹出框。

@code('${DEMO_PATH}/cascader-input/demo/Basic.vue')

## API

### CascaderInputProps

继承 [`CascaderPopoutProps`](./cascader-popout#CascaderPopoutProps) 并有以下额外属性：

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

### CascaderInputSlots

继承 [`CascaderPopoutSlots`](./cascader-popout#CascaderPopoutSlots)

### CascaderInputEmits

继承 [`CascaderPopoutEmits`](./cascader-popout#CascaderPopoutEmits)
