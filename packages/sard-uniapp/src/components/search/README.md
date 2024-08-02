# Search 搜索

## 介绍

用于搜索场景的输入框组件。

## 引入

```ts
import Search from 'sard-uniapp/components/search/search.vue'
```

## 代码演示

### 基础使用

`v-model` 用于控制搜索框中的文字。

@code('${DEMO_PATH}/search/demo/Basic.vue')

### 搜索按钮

使用 `search` 属性可以添加右侧的按钮，在按钮点击时触发 `search` 事件。

@code('${DEMO_PATH}/search/demo/SearchButton.vue')

### 取消按钮

使用 `cancel` 属性可以添加右侧的按钮，在按钮点击时触发 `cancel` 事件，并在点击按钮后清空输入框。

@code('${DEMO_PATH}/search/demo/CancelButton.vue')

### 形状

设置 `shape="round"` 可以将输入框变为圆形。

@code('${DEMO_PATH}/search/demo/Shape.vue')

### 对齐

设置 `align="center"` 可以将输入内容居中。

@code('${DEMO_PATH}/search/demo/Align.vue')

### 背景色

通过 `background` 属性可以设置搜索框外部的背景色。
通过 `inputBackground` 属性可以设置搜索框内部的背景色。

@code('${DEMO_PATH}/search/demo/Background.vue')

### 只读和禁用

只读或禁用后不可输入。

@code('${DEMO_PATH}/search/demo/DisabledReadOnly.vue')

### 插槽

通过 `prepend`、`append`、`inputPrepend`、`inputAppend` 插槽可以自定义内容。

@code('${DEMO_PATH}/search/demo/Slot.vue')

## API

### SearchProps

| 属性                  | 描述               | 类型                          | 默认值   |
| --------------------- | ------------------ | ----------------------------- | -------- |
| root-class            | 组件根元素类名     | string                        | -        |
| root-style            | 组件根元素样式     | StyleValue                    | -        |
| model-value (v-model) | 输入框值           | string                        | -        |
| placeholder           | 输入框占位符内容   | string                        | -        |
| shape                 | 输入框形状         | 'round' \| 'square'           | 'square' |
| background            | 搜索框外部的背景色 | string                        | -        |
| input-background      | 搜索框内部的背景色 | string                        | -        |
| input-color           | 输入框文本颜色     | string                        | -        |
| disabled              | 禁用状态           | boolean                       | false    |
| readonly              | 只读状态           | boolean                       | false    |
| align                 | 输入框文字对齐     | 'left' \| 'center' \| 'right' | 'left'   |
| cancel                | 定义取消按钮       | string                        | -        |
| search                | 定义搜索按钮       | string                        | -        |
| focus                 | 获取焦点           | boolean                       | false    |

### SearchSlots

| 插槽          | 描述           | 属性 |
| ------------- | -------------- | ---- |
| prepend       | 搜索框前置插槽 | -    |
| append        | 搜索框后置插槽 | -    |
| input-prepend | 输入框前置插槽 | -    |
| input-append  | 输入框后置插槽 | -    |

### SearchEmits

| 事件                    | 描述               | 类型                    |
| ----------------------- | ------------------ | ----------------------- |
| update:model-value      | 输入框值改变时触发 | (value: string) => void |
| cancel                  | 点击取消按钮时触发 | () => void              |
| search                  | 点击确定按钮时触发 | (value: string) => void |
| click                   | 点击组件时触发     | (event: any) => void    |
| clear <sup>1.4.1+</sup> | 点击清除按钮时触发 | () => void              |
| focus <sup>1.4.1+</sup> | 聚焦时触发         | (event: any) => void    |
| blur <sup>1.4.1+</sup>  | 失焦时触发         | (event: any) => void    |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
