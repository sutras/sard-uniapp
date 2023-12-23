# PasswordInput 密码输入框

## 介绍

用于输入密码、验证码等场景可结合数字键盘组件或原生键盘使用。

## 引入

```ts
import PasswordInput from 'sard-uniapp/components/password-input/password-input.vue'
```

## 代码演示

### 基础使用

默认可以输入 6 个字符。

@code('${DEMO_PATH}/password-input/demo/Basic.vue')

### 下划线类型

`type` 属性可以设置为 `underline` 显示为下划线类型。

@code('${DEMO_PATH}/password-input/demo/Underline.vue')

### 间距

通过 `gap` 属性来设置格子之间的间距。

@code('${DEMO_PATH}/password-input/demo/Gap.vue')

### 明文显示

设置 `plainText` 属性可以明文展示输入的内容，适用于短信验证码等场景。

@code('${DEMO_PATH}/password-input/demo/PlainText.vue')

### 只读和禁用

只读和禁用后不可以操作。

@code('${DEMO_PATH}/password-input/demo/DisabledReadOnly.vue')

### 使用自定义键盘

设置 `customKeyboard` 属性可以使用自定义键盘输入，如果 `focused` 属性为真则会显示聚焦状态。

@code('${DEMO_PATH}/password-input/demo/CustomKeyboard.vue')

## API

### PasswordInputProps

| 属性                  | 描述               | 类型                    | 默认值   |
| --------------------- | ------------------ | ----------------------- | -------- |
| root-class            | 组件根元素类名     | string                  | -        |
| root-style            | 组件根元素样式     | StyleValue              | -        |
| model-value (v-model) | 密码输入框值       | string                  | -        |
| length                | 密码长度           | number                  | 6        |
| type                  | 密码输入框类型     | 'border' \| 'underline' | 'border' |
| gap                   | 密码输入框项间距   | number \| string        | -        |
| plain-text            | 是否明文显示       | boolean                 | false    |
| focused (v-model)     | 是否获取焦点       | boolean                 | false    |
| custom-keyboard       | 是否使用自定义键盘 | boolean                 | false    |
| disabled              | 禁用状态           | boolean                 | false    |
| readonly              | 只读状态           | boolean                 | false    |
| validate-event        | 是否触发表单验证   | boolean                 | true     |

### PasswordInputEmits

| 事件               | 描述                  | 类型                       |
| ------------------ | --------------------- | -------------------------- |
| update:model-value | 输入框值改变时触发    | (value: string) => void    |
| updat:focused      | 输入框聚焦/失焦时触发 | (focused: boolean) => void |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
