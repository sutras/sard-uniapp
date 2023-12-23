# Radio 单选按钮

## 介绍

在一组可选项中进行单一选择。

## 引入

```ts
import Radio from 'sard-uniapp/components/radio/radio.vue'
import RadioGroup from 'sard-uniapp/components/radio-group/radio-group.vue'
```

## 代码演示

### 基础使用

使用 `v-model` 绑定当前选中值。

@code('${DEMO_PATH}/radio/demo/Basic.vue')

### 排列方向

将 `direction` 属性设置为 `horizontal` 后，单选按钮组会变成水平排列。

@code('${DEMO_PATH}/radio/demo/Direction.vue')

### 禁用

只读或禁用后不可点击。

@code('${DEMO_PATH}/radio/demo/Disabled.vue')

### 图标大小

使用 `size` 属性设置图标大小。

@code('${DEMO_PATH}/radio/demo/Size.vue')

### 自定义颜色

使用 `checkedColor` 属性设置选中时的图标颜色。

@code('${DEMO_PATH}/radio/demo/Color.vue')

### 图标类型

设置 `type` 属性为 `record` 可以使图标变为圆点类型。

@code('${DEMO_PATH}/radio/demo/Type.vue')

### 自定义图标

如果内置的图标不满足需求，可以使用 `icon` 插槽设置为任意的图标。
插槽接收`checked`属性表示当前的选中状态。

@code('${DEMO_PATH}/radio/demo/Icon.vue')

### 自定义

利用单选按钮组的 `custom` 插槽可以将单选按钮和其他组件结合使用。
`custom` 插槽接收 `toggle` 方法来切换选中状态；
同时要给单选按钮组件添加 `readonly` 属性以便将点击操作交给其他组件。

@code('${DEMO_PATH}/radio/demo/Custom.vue')

## API

### RadioProps

| 属性          | 描述                                 | 类型                 | 默认值   |
| ------------- | ------------------------------------ | -------------------- | -------- |
| root-class    | 组件根元素类名                       | string               | -        |
| root-style    | 组件根元素样式                       | StyleValue           | -        |
| value         | 单选按钮的值，配合单选按钮组一起使用 | any                  | -        |
| label         | 单选按钮标签                         | string               | -        |
| disabled      | 禁用状态                             | boolean              | -        |
| readonly      | 只读状态                             | boolean              | -        |
| size          | 图标的尺寸                           | string               | -        |
| type          | 图标类型                             | 'circle' \| 'record' | 'circle' |
| checked-color | 选中时图标的颜色                     | string               | -        |

### RadioSlots

| 插槽    | 描述           | 属性                 |
| ------- | -------------- | -------------------- |
| default | 自定义默认内容 | -                    |
| icon    | 自定义图标     | { checked: boolean } |

### RadioEmits

| 事件  | 描述       | 类型                 |
| ----- | ---------- | -------------------- |
| click | 点击时触发 | (event: any) => void |

### RadioGroupProps

| 属性                  | 描述             | 类型                       | 默认值     |
| --------------------- | ---------------- | -------------------------- | ---------- |
| root-class            | 组件根元素类名   | string                     | -          |
| root-style            | 组件根元素样式   | StyleValue                 | -          |
| model-value (v-model) | 指定选中的选项   | any                        | -          |
| disabled              | 禁用状态         | boolean                    | -          |
| readonly              | 只读状态         | boolean                    | -          |
| size                  | 图标的尺寸       | string                     | -          |
| type                  | 图标类型         | 'circle' \| 'record'       | 'circle'   |
| checked-color         | 选中时图标的颜色 | string                     | -          |
| direction             | 排列方向         | 'horizontal' \| 'vertical' | 'vertical' |
| validate-event        | 是否触发表单验证 | boolean                    | true       |

### RadioGroupSlots

| 插槽    | 描述                                                                             | 属性                                         |
| ------- | -------------------------------------------------------------------------------- | -------------------------------------------- |
| default | 自定义默认内容                                                                   | -                                            |
| custom  | 同默认插槽，额外可以接收 `toggle` 方法切换选中状态，用于自定义单选按钮结构和样式 | { toggle: (value: any) => void, value: any } |

### RadioGroupEmits

| 事件               | 描述                   | 类型                 |
| ------------------ | ---------------------- | -------------------- |
| update:model-value | 单选按钮组值改变时触发 | (value: any) => void |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
