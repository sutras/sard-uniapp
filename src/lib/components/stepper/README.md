---
nav: 组件
title: Stepper
subtitle: 步进器
group: 表单组件
---

## 介绍

通过键盘或按钮输入或改变数值。

## 引入

```ts
import Stepper from 'sard-uniapp/components/stepper/stepper.vue'
```

## 代码演示

### 基础使用

使用 `v-model` 绑定输入框值。

@code('${DEMO_PATH}/stepper/demo/Basic.vue')

### 最大最小值

使用 `min` 和 `max` 属性限制可以输入的最大最小值。

@code('${DEMO_PATH}/stepper/demo/MinMax.vue')

### 步长

使用 `step` 属性设置点击增加或减少按钮时变化的值。

@code('${DEMO_PATH}/stepper/demo/Step.vue')

### 精度

使用 `precision` 属性设置数值的精度，即保留的小数位数，底层通过 `toFixed` 实现，因此需要设置大于等于 0 的整数。

@code('${DEMO_PATH}/stepper/demo/Precision.vue')

### 只读和禁用

只读或禁用时无法输入。

@code('${DEMO_PATH}/stepper/demo/DisabledReadOnly.vue')

### 尺寸

设置 `size="small"` 可以小尺寸展示步进器。

@code('${DEMO_PATH}/stepper/demo/Size.vue')

## API

### StepperProps

| 属性                  | 描述                                  | 类型                             | 默认值                  |
| --------------------- | ------------------------------------- | -------------------------------- | ----------------------- |
| root-class            | 组件根元素类名                        | string                           | -                       |
| root-style            | 组件根元素样式                        | StyleValue                       | -                       |
| model-value (v-model) | 当前输入值                            | number \| string                 | -                       |
| min                   | 最小值                                | number                           | Number.MIN_SAFE_INTEGER |
| max                   | 最大值                                | number                           | Number.MAX_SAFE_INTEGER |
| value-on-clear        | 当输入框被清空时显示的值              | number \| null \| 'min' \| 'max' | null                    |
| step                  | 点击按钮时增加或减少的数值            | number                           | 1                       |
| precision             | 数值精度，即允许的小数位数            | number                           | -                       |
| input-style           | 输入框样式                            | string                           | -                       |
| input-type            | 输入框类型                            | 'number' \| 'digit' \| 'text'    | 'number'                |
| placeholder           | 输入框占位符                          | string                           | -                       |
| disabled              | 禁用状态                              | boolean                          | false                   |
| readonly              | 只读状态                              | boolean                          | false                   |
| press                 | 是否可以通过长按增加/减少按钮改变数值 | boolean                          | true                    |
| press-time            | 触发长按事件的时间，单位毫秒          | boolean                          | 350                     |
| interval              | 长按改变数值的时间间隔，单位毫秒      | number                           | 150                     |
| validate-event        | 是否触发表单验证                      | boolean                          | true                    |
| size                  | 步进器尺寸                            | 'medium' \| 'small'              | 'medium'                |

### StepperEmits

| 事件               | 描述               | 类型                                           |
| ------------------ | ------------------ | ---------------------------------------------- |
| update:model-value | 输入框值改变时触发 | (value: number \| string \| undefined) => void |
| focus              | 输入框聚焦时触发   | (event: any) => void                           |
| blur               | 输入框失焦时触发   | (event: any) => void                           |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
