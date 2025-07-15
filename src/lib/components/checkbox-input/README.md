---
nav: 组件
title: CheckboxInput
subtitle: 复选输入框
group: 表单组件
version: 1.3+
---

## 介绍

组合了复选弹出框、列表、输入框组件，实现了在弹出框中多选的功能。

## 引入

```ts
import CheckboxInput from 'sard-uniapp/components/checkbox-input/checkbox-input.vue'
```

## 代码演示

### 基础使用

通过 `title` 和 `placeholder` 属性设置弹出框标题和输入框占位文本，
通过 `options` 属性设置可选项。

@code('${DEMO_PATH}/checkbox-input/demo/Basic.vue')

## API

### CheckboxInputProps

继承 [`CheckboxPopoutProps`](./checkbox-popout#CheckboxPopoutProps) 并有以下额外属性：

| 属性                              | 描述                   | 类型       | 默认值          |
| --------------------------------- | ---------------------- | ---------- | --------------- |
| root-class                        | 弹出式输入框根元素类名 | string     | -               |
| root-style                        | 弹出式输入框根元素样式 | StyleValue | -               |
| clearable                         | 是否显示清空按钮       | boolean    | false           |
| placeholder                       | 输入框占位符内容       | string     | -               |
| value-on-clear <sup>1.19.2+</sup> | 设置点击清除按钮后的值 | () => any  | () => undefined |
| arrow <sup>1.22+</sup>            | 自定义箭头图标名       | string     | 'caret-right'   |
| arrow-family <sup>1.22+</sup>     | 自定义箭头图标字体     | string     | 'sari'          |
| input-props <sup>1.22+</sup>      | 自定义输入框组件属性   | InputProps | -               |

### CheckboxInputSlots

| 插槽                   | 描述       | 属性       |
| ---------------------- | ---------- | ---------- |
| arrow <sup>1.22+</sup> | 自定义箭头 | () => void |

### CheckboxInputEmits

继承 [`CheckboxPopoutEmits`](./checkbox-popout#CheckboxPopoutEmits)
