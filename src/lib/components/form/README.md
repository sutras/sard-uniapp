---
nav: 组件
title: Form
subtitle: 表单
group: 表单组件
---

## 介绍

用于数据采集，由各种类型的表单域组成，可对数据进行校验、清除、重置、提交等操作。

## 引入

```ts
import Form from 'sard-uniapp/components/form/form.vue'
import FormItem from 'sard-uniapp/components/form-item/form-item.vue'
```

## 代码演示

### 典型表单

最基础的表单包括各种输入表单项，比如 `input、picker-input、radio、checkbox` 等。

在每一个 `form` 组件中，你需要一个 `form-item` 字段作为输入项的容器，用于获取值与验证值。

@code('${DEMO_PATH}/form/demo/Typical.vue')

### 方向与对齐

使用 `direction` 设置表单域标签水平或垂直排列；
使用 `label-align` 或 `label-valign` 设置标签表单域标签水平或垂直方向的对齐方式；
使用 `star-position` 属性设置星号居左或居右。

@code('${DEMO_PATH}/form/demo/DirectionAlign.vue')

### 表单校验

`Form` 组件允许你验证用户的输入是否符合规范，来帮助你找到和纠正错误。

`Form` 组件提供了表单验证的功能，只需为 `rules` 属性传入约定的验证规则，并将 `FormItem` 的 `name` 属性设置为需要验证的特殊键值即可。

@code('${DEMO_PATH}/form/demo/Validate.vue')

### 自定义校验规则

这个例子中展示了如何使用自定义验证规则来完成密码的二次验证。

本例还使用 `validate` 插槽为输入框添加了表示校验中状态的反馈图标。

@code('${DEMO_PATH}/form/demo/CustomValidate.vue')

### 添加/删除表单项

除了一次通过表单组件上的所有验证规则外. 您也可以动态地通过验证规则或删除单个表单字段的规则。

@code('${DEMO_PATH}/form/demo/DynamicFormItem.vue')

### 简单登录框

基本的表单数据域控制展示，包含布局、初始化、验证、提交。

@code('${DEMO_PATH}/form/demo/BasicLogin.vue')

### Label 宽度

通过 `label-width` 属性设置标签宽度。

@code('${DEMO_PATH}/form/demo/LabelWidth.vue')

### 表单只读和禁用

设置表单组件禁用或只读，仅对 `sard` 组件有效。

@code('${DEMO_PATH}/form/demo/DisabledReadOnly.vue')

### 登录框

下面实现了一个简单的登录框组件。

@code('${DEMO_PATH}/form/demo/Login.vue')

### 嵌套结构与校验信息

`name` 属性支持嵌套数据结构。

@code('${DEMO_PATH}/form/demo/Nested.vue')

### 自定义表单控件

自定义或第三方的表单控件，也可以与 `Form` 组件一起使用。只要该组件注入 `useFormItemContext` 并调用相应方法。

@code('${DEMO_PATH}/form/demo/CustomControl.vue')

`PriceInput` 组件：

@code('${DEMO_PATH}/form/demo/PriceInput.vue')

### 复杂的动态增减表单项

这个例子演示了一个表单中包含多个表单控件的情况。

@code('${DEMO_PATH}/form/demo/ComplexDynamicFormItem.vue')

### 动态增减嵌套字段

通过数组 `name` 绑定嵌套字段。

@code('${DEMO_PATH}/form/demo/DynamicNested.vue')

### 动态校验规则

根据不同情况执行不同的校验规则。

@code('${DEMO_PATH}/form/demo/DynamicValidate.vue')

### 多表单联动

把一个表单的数据添加到另一个表单。

@code('${DEMO_PATH}/form/demo/MultiFormLinkage.vue')

### 弹出层中的新建表单

当用户访问一个展示了某个列表的页面，想新建一项但又不想跳转页面时，可以用 `Dialog` 弹出一个表单，用户填写必要信息后创建新的项。

@code('${DEMO_PATH}/form/demo/DialogForm.vue')

### 滚动到第一个错误字段

当表单超过一屏，在验证失败后想要将验证错误的表单域定位到屏幕中，可以设置 `scroll-to-first-error` 属性。

@code('${DEMO_PATH}/form/demo/ScrollToFirstError.vue')

### toast 显示验证错误信息

通过设置 `showError` 属性隐藏默认验证错误信息，再通过 toast 显示 `validate()` 方法 `catch` 回调中的信息。

@code('${DEMO_PATH}/form/demo/ToastValidateError.vue')

### 手机号登录

演示了常用的手机号登录的表单实现。

@code('${DEMO_PATH}/form/demo/MobileLogin.vue')

### 修改密码

演示了常用的修改密码的表单实现。

@code('${DEMO_PATH}/form/demo/ChangePassword.vue')

### 忘记密码

演示了常用的忘记密码的表单实现。

@code('${DEMO_PATH}/form/demo/ForgetPassword.vue')

## API

### FormProps

| 属性                     | 描述                                                                               | 类型                                                       | 默认值                                              |
| ------------------------ | ---------------------------------------------------------------------------------- | ---------------------------------------------------------- | --------------------------------------------------- |
| root-class               | 组件根元素类名                                                                     | string                                                     | -                                                   |
| root-style               | 组件根元素样式                                                                     | StyleValue                                                 | -                                                   |
| model                    | 表单数据对象                                                                       | Record\<string, any>                                       | -                                                   |
| rules                    | 表单验证规则                                                                       | FormRules                                                  | -                                                   |
| validate-trigger         | 设置字段校验的时机                                                                 | TriggerType                                                | change                                              |
| validate-on-rule-change  | 是否在 `rules` 属性改变后立即触发一次验证                                          | boolean                                                    | true                                                |
| direction                | 表单排列方向                                                                       | 'horizontal' \| 'vertical'                                 | 'horizontal'                                        |
| label-width              | 标签宽度                                                                           | string                                                     | -                                                   |
| label-align              | 标签水平对齐方式                                                                   | 'start' \| 'center' \| 'end'                               | 'start'                                             |
| label-valign             | 标签垂直对齐方式                                                                   | 'start' \| 'center' \| 'end'                               | 'start'                                             |
| star-position            | 必填星号在标签的左边或右边                                                         | 'left' \| 'right'                                          | 'left'                                              |
| hide-star                | 是否隐藏必填时的星号                                                               | boolean                                                    | false                                               |
| show-error               | 是否显示校验错误信息                                                               | boolean                                                    | true                                                |
| scroll-to-first-error    | 当校验失败时，滚动到第一个错误表单项                                               | boolean                                                    | false                                               |
| scroll-into-view-options | 自定义滚动配置选项                                                                 | [ScrollIntoViewOptions](../guide/scroll-into-view-options) | {position: 'nearest', startOffset: 0, endOffset: 0} |
| disabled                 | 是否禁用该表单内的所有组件。 如果设置为 `true`, 它将覆盖内部组件的 `disabled` 属性 | boolean                                                    | false                                               |
| readonly                 | 是否只读该表单内的所有组件。 如果设置为 `true`, 它将覆盖内部组件的 `readonly` 属性 | boolean                                                    | false                                               |

### FormSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### FormExpose

| 属性          | 描述                                             | 类型                                      |
| ------------- | ------------------------------------------------ | ----------------------------------------- |
| validate      | 对整个表单的内容进行验证。                       | (nameList?: FieldName[]) => Promise<void> |
| reset         | 重置表单项，将其值重置为初始值，并移除校验结果。 | (nameList?: FieldName[]) => Promise<void> |
| clearValidate | 清理指定字段的表单验证信息。                     | (nameList?: FieldName[]) => Promise<void> |
| scrollToField | 滚动到指定的字段                                 | (name: FieldName) => void                 |

### FormItemProps

| 属性             | 描述                                                                                   | 类型                         | 默认值       |
| ---------------- | -------------------------------------------------------------------------------------- | ---------------------------- | ------------ |
| root-class       | 组件根元素类名                                                                         | string                       | -            |
| root-style       | 组件根元素样式                                                                         | StyleValue                   | -            |
| direction        | 表单排列方向                                                                           | 'horizontal' \| 'vertical'   | 'horizontal' |
| label-width      | 标签宽度                                                                               | string                       | -            |
| label-align      | 标签水平对齐方式                                                                       | 'start' \| 'center' \| 'end' | 'start'      |
| label-valign     | 标签垂直对齐方式                                                                       | 'start' \| 'center' \| 'end' | 'start'      |
| star-position    | 必填星号在标签的左边或右边                                                             | 'left' \| 'right'            | 'left'       |
| label            | 标签文本                                                                               | string                       | -            |
| required         | 是否为必填项，如不设置，则会根据校验规则确认                                           | boolean                      | -            |
| name             | 表单域 `model` 字段，在使用 `validate、reset` 方法的情况下，该属性是必填的。           | FieldName                    | -            |
| rules            | 表单验证规则                                                                           | Rule \| Rule[]               | -            |
| validate-trigger | 设置字段校验的时机                                                                     | TriggerType                  | change       |
| error            | 表单域验证错误时的提示信息。设置该值会导致表单验证状态变为 `error`，并显示该错误信息。 | string                       | -            |
| show-error       | 是否显示校验错误信息                                                                   | boolean                      | true         |
| inlaid           | 去掉边框和内边距，用于嵌入到其他组件中                                                 | boolean                      | false        |

### FormItemSlots

| 插槽     | 描述                                 | 属性                     |
| -------- | ------------------------------------ | ------------------------ |
| default  | 自定义默认内容                       | -                        |
| label    | 自定义标签内容                       | -                        |
| validate | 同默认插槽，额外接受当前验证状态属性 | { state: ValidateState } |

### FormItemExpose

| 属性            | 描述                                               | 类型                                            |
| --------------- | -------------------------------------------------- | ----------------------------------------------- |
| validate        | 对整个表单的内容进行验证。                         | (trigger?: string \| string[]) => Promise<void> |
| reset           | 重置该表单项，将其值重置为初始值，并移除校验结果。 | () => Promise<void>                             |
| clearValidate   | 清理指定字段的表单验证信息。                       | () => void                                      |
| scrollToField   | 滚动到当前字段                                     | () => void                                      |
| validateMessage | 当前验证信息                                       | Ref<string>                                     |
| validateState   | 当前验证状态                                       | Ref<ValidateState>                              |

### FormRules

```ts
interface FormRules {
  [key: PropertyKey]: Rule | Rule[] | FormRules
}
```

### TriggerType

```ts
type TriggerType = 'change' | 'blur' | ('change' | 'blur')[]
```

### FieldName

```ts
type FieldName = string | number | (string | number)[]
```

### ValidateState

```ts
type ValidateState = '' | 'success' | 'error' | 'validating'
```

### Rule

| 属性       | 描述                                                                             | 类型                                                                         | 默认值   |
| ---------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | -------- |
| validator  | 使用函数自定义验证，具体说明如下                                                 | (value: any, rule: Rule) => Promise\<void> \| boolean \| string \| undefined | -        |
| pattern    | 通过正则来进行校验                                                               | RegExp                                                                       | -        |
| message    | 校验失败的反馈文案                                                               | string \| (() => string)                                                     | -        |
| trigger    | 触发校验的时机                                                                   | string \| string[]                                                           | -        |
| transform  | 将值转换后再进行校验                                                             | (value: any) => any                                                          | -        |
| type       | 使用内置的校验规则                                                               | ValidatorType                                                                | 'string' |
| enum       | 是否匹配枚举中的值（需要将 type 设置为 enum）                                    | (string \| number)[]                                                         | -        |
| len        | 当 `type` 为字符串（字符串长度）、数值（等于数值）、数组（数组长度）时有效       | number                                                                       | -        |
| min        | 当 `type` 为字符串（字符串最小长度）、数值（最小值）、数组（数组最小长度）时有效 | number                                                                       | -        |
| max        | 当 `type` 为字符串（字符串最大长度）、数值（最大值）、数组（数组最大长度）时有效 | number                                                                       | -        |
| required   | 是否为必选字段，当值为空值时 `'', [], false, undefined, null`，校验不通过        | boolean                                                                      | false    |
| whitespace | `type` 为 `'string'` 时，如果字段仅包含空格则校验不通过                          | boolean                                                                      | false    |

#### Rule['validator'] 说明

当函数返回值为 `fulfilled` 状态的 `Promise` 或者 `true` 则验证通过，否则验证不通过；
`Promise.reject` 的参数或者返回的字符串会作为错误验证信息，如果返回的不是字符串，则取 `Rule['message']` 的配置作为错误信息。

### ValidatorType

| 类型     | 描述                                                                   |
| -------- | ---------------------------------------------------------------------- |
| string   | 必须为字符串                                                           |
| number   | 必须为数值                                                             |
| boolean  | 必须为布尔值                                                           |
| function | 必须为函数                                                             |
| regexp   | 必须为 `RegExp` 类型，或者作为 `RegExp()` 参数被实例化不会报错的字符串 |
| integer  | 必须为数值，且为整数                                                   |
| float    | 必须为数值，且为小数                                                   |
| array    | 必须为数组                                                             |
| object   | 必须为对象，且不为数组和 `null`                                        |
| enum     | 必须存在于 `Rule['enum']` 中                                           |
| date     | 必须为 `Date` 类型                                                     |
| url      | 必须为 `url`                                                           |
| hex      | 必须为 `hex`                                                           |
| email    | 必须为邮件                                                             |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
