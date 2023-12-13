# Checkbox 复选框

## 介绍

在一组可选项中进行任意选择。

## 引入

```ts
import Checkbox from '@sard/uniapp/dist/checkbox/checkbox.vue'
import CheckboxGroup from '@sard/uniapp/dist/checkbox-group/checkbox-group.vue'
```

## 代码演示

### 基础使用

使用 `checked` 属性控制是否选中。

@code('${DEMO_PATH}/checkbox/demo/Basic.vue')

### 只读和禁用

只读或禁用后不可点击。

@code('${DEMO_PATH}/checkbox/demo/DisabledReadOnly.vue')

### 图标大小

使用 `size` 属性设置图标大小。

@code('${DEMO_PATH}/checkbox/demo/Size.vue')

### 自定义颜色

使用 `checkedColor` 属性设置选中时的图标颜色。

@code('${DEMO_PATH}/checkbox/demo/Color.vue')

### 图标类型

设置 `type` 属性为 `circle` 可以使图标变为圆形。

@code('${DEMO_PATH}/checkbox/demo/Type.vue')

### 自定义图标

如果内置的图标不满足需求，可以使用 `icon` 插槽设置为任意的图标。
插槽接收`checked`属性表示当前的选中状态。

@code('${DEMO_PATH}/checkbox/demo/Icon.vue')

### 复选框组

复选框组用于收集选中状态的复选框的值。

@code('${DEMO_PATH}/checkbox/demo/Group.vue')

### 自定义

利用复选框组的 `custom` 插槽可以将复选框和其他组件结合使用。
`custom` 插槽接收 `toggle` 方法来切换选中状态；
同时要给复选框组件添加 `readonly` 属性以便将点击操作交给其他组件。

@code('${DEMO_PATH}/checkbox/demo/Custom.vue')

## API

### CheckboxProps

| 属性              | 描述                             | 类型                 | 默认值   |
| ----------------- | -------------------------------- | -------------------- | -------- |
| root-class        | 组件根元素类名                   | string               | -        |
| root-style        | 组件根元素样式                   | StyleValue           | -        |
| checked (v-model) | 是否选中                         | boolean              | false    |
| value             | 复选框的值，配合复选框组一起使用 | any                  | -        |
| label             | 复选框标签                       | string               | -        |
| disabled          | 禁用状态                         | boolean              | -        |
| readonly          | 只读状态                         | boolean              | -        |
| size              | 图标的尺寸                       | string               | -        |
| type              | 图标类型                         | 'square' \| 'circle' | 'square' |
| checked-color     | 选中时图标的颜色                 | string               | -        |
| validate-event    | 是否触发表单验证                 | boolean              | true     |

### CheckboxSlots

| 插槽    | 描述           | 属性                 |
| ------- | -------------- | -------------------- |
| default | 自定义默认内容 | -                    |
| icon    | 自定义图标     | { checked: boolean } |

### CheckboxEmits

| 事件           | 描述               | 类型                       |
| -------------- | ------------------ | -------------------------- |
| click          | 点击时触发         | (event: any) => void       |
| update:checked | 选中状态改变时触发 | (checked: boolean) => void |

### CheckboxGroupProps

| 属性                  | 描述             | 类型                 | 默认值   |
| --------------------- | ---------------- | -------------------- | -------- |
| root-class            | 组件根元素类名   | string               | -        |
| root-style            | 组件根元素样式   | StyleValue           | -        |
| model-value (v-model) | 指定选中的选项   | any[]                | -        |
| disabled              | 禁用状态         | boolean              | -        |
| readonly              | 只读状态         | boolean              | -        |
| size                  | 图标的尺寸       | string               | -        |
| type                  | 图标类型         | 'square' \| 'circle' | 'square' |
| checked-color         | 选中时图标的颜色 | string               | -        |
| validate-event        | 是否触发表单验证 | boolean              | true     |

### CheckboxGroupSlots

| 插槽    | 描述                                                                           | 属性                                           |
| ------- | ------------------------------------------------------------------------------ | ---------------------------------------------- |
| default | 自定义默认内容                                                                 | -                                              |
| custom  | 同默认插槽，额外可以接收 `toggle` 方法切换选中状态，用于自定义复选框结构和样式 | { toggle: (value: any) => void, value: any[] } |

### CheckboxGroupEmits

| 事件               | 描述                 | 类型                   |
| ------------------ | -------------------- | ---------------------- |
| update:model-value | 复选框组值改变时触发 | (value: any[]) => void |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
