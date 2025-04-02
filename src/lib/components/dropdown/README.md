---
nav: 组件
title: Dropdown
subtitle: 下拉菜单
group: 导航组件
---

## 介绍

可向下/向上弹出菜单列表，或自定义弹出的菜单内容。

## 引入

```ts
import Dropdown from 'sard-uniapp/components/dropdown/dropdown.vue'
import DropdownItem from 'sard-uniapp/components/dropdown-item/dropdown-item.vue'
```

## 代码演示

### 基础使用

使用 `options` 配置下拉菜单项，使用 `v-model` 绑定选中的值。

@code('${DEMO_PATH}/dropdown/demo/Basic.vue')

### 占位符

占位符会在未选中值时显示说明文字。

@code('${DEMO_PATH}/dropdown/demo/Placeholder.vue')

### 添加 label

相较于占位符， `label` 会一直显示。

@code('${DEMO_PATH}/dropdown/demo/Label.vue')

### 向上展开

底部空间不足时可以配置向上弹出菜单。

@code('${DEMO_PATH}/dropdown/demo/Direction.vue')

### 禁用

禁用的菜单项不可点击。

@code('${DEMO_PATH}/dropdown/demo/Disabled.vue')

### 自定义内容

除了显示菜单项，下拉菜单还可以显示任意内容，这时可以使用 `v-model:visible` 控制显隐。

@code('${DEMO_PATH}/dropdown/demo/Content.vue')

## API

### DropdownProps

| 属性             | 描述                         | 类型           | 默认值 |
| ---------------- | ---------------------------- | -------------- | ------ |
| root-class       | 组件根元素类名               | string         | -      |
| root-style       | 组件根元素样式               | StyleValue     | -      |
| direction        | 菜单弹出方向                 | 'down' \| 'up' | 'down' |
| disabled         | 是否禁用                     | boolean        | false  |
| away-closable    | 是否在点击外部区域后自动隐藏 | boolean        | true   |
| overlay-closable | 是否在点击遮罩后自动隐藏     | boolean        | true   |
| duration         | 显隐动画时长，单位 ms        | number         | 300    |

### DropdownSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### DropdownItemProps

| 属性                  | 描述                     | 类型             | 默认值 |
| --------------------- | ------------------------ | ---------------- | ------ |
| root-class            | 组件根元素类名           | string           | -      |
| root-style            | 组件根元素样式           | StyleValue       | -      |
| title                 | 标题，用于自定义菜单内容 | string           | -      |
| label                 | 标签说明                 | string           | -      |
| options               | 菜单选项                 | DropdownOption[] | []     |
| direction             | 菜单弹出方向             | 'down' \| 'up'   | 'down' |
| disabled              | 是否禁用                 | boolean          | false  |
| model-value (v-model) | 当前选择的菜单项的值     | any              | -      |
| visible (v-model)     | 弹出框是否可见           | boolean          | -      |
| separator             | 标签后面分隔符           | string           | -      |
| placeholder           | 占位符                   | string           | -      |

### DropdownItemSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### DropdownItemEmits

| 事件                      | 描述               | 类型                       |
| ------------------------- | ------------------ | -------------------------- |
| update:model-value        | 选中菜单选项时触发 | (value: any) => void       |
| change <sup>1.12.2+</sup> | 选中菜单选项时触发 | (value: any) => void       |
| update:visible            | 弹出框显隐时触发   | (visible: boolean) => void |

### DropdownOption

| 属性  | 描述         | 类型   | 默认值 |
| ----- | ------------ | ------ | ------ |
| label | 定义选项标签 | string | -      |
| value | 定义选项的值 | any    | -      |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
