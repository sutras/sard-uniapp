---
nav: 组件
title: Slider
subtitle: 滑块
group: 表单组件
---

## 介绍

选择给定范围的一个值和区间。

## 引入

```ts
import Slider from 'sard-uniapp/components/slider/slider.vue'
```

## 代码演示

### 基础使用

使用 `v-model` 绑定当前值。

@code('${DEMO_PATH}/slider/demo/Basic.vue')

### 范围选择

使用 `range` 属性设置成范围选择。

@code('${DEMO_PATH}/slider/demo/Range.vue')

### 显示值

设置 `show-value` 属性会在滑块上方显示当前滑块对应的值。

@code('${DEMO_PATH}/slider/demo/ShowValue.vue')

### 最大最小值

使用 `min` 和 `max` 属性限制可以选择的最大最小值。

@code('${DEMO_PATH}/slider/demo/MinMax.vue')

### 垂直

使用 `vertical` 属性垂直展示滑块。

@code('${DEMO_PATH}/slider/demo/Vertical.vue')

### 步长

使用 `step` 属性限制只能选择指定数字的倍数的值。

@code('${DEMO_PATH}/slider/demo/Step.vue')

### 显示刻度

设置 `show-scale` 属性可以显示步长对应的刻度，设置 `scale-position` 属性可以让刻度显示在各个方位。

@code('${DEMO_PATH}/slider/demo/ShowScale.vue')

### 自定义颜色

使用 `track-color` 属性设置轨道颜色；使用 `piece-color` 属性设置选中片段的颜色；使用 `thumb-color` 属性设置按钮的颜色。

@code('${DEMO_PATH}/slider/demo/Color.vue')

### 自定义尺寸

使用 `track-size` 属性设置轨道尺寸；使用 `thumb-size` 属性设置滑块的尺寸。

@code('${DEMO_PATH}/slider/demo/Size.vue')

### 只读和禁用

只读和禁用状态下无法操作。

@code('${DEMO_PATH}/slider/demo/DisabledReadOnly.vue')

### 自定义滑块插槽

滑块插槽可以用于自定义滑块样式。

@code('${DEMO_PATH}/slider/demo/Slot.vue')

## API

### SliderProps

| 属性             | 描述             | 类型                                   | 默认值            |
| ---------------- | ---------------- | -------------------------------------- | ----------------- |
| root-class       | 组件根元素类名   | string                                 | -                 |
| root-style       | 组件根元素样式   | StyleValue                             | -                 |
| range            | 双滑块模式       | boolean                                | false             |
| model-value      | 滑块值           | number \| number[]                     | -                 |
| min              | 最小值           | number                                 | 0                 |
| max              | 最大值           | number                                 | 100               |
| step             | 步长             | number                                 | 1                 |
| vertical         | 垂直方向滑块     | boolean                                | false             |
| disabled         | 禁用状态         | boolean                                | false             |
| readonly         | 只读状态         | boolean                                | false             |
| piece-color      | 滑块间的轨道颜色 | string                                 | -                 |
| track-color      | 滑块轨道颜色     | string                                 | -                 |
| track-size       | 滑块轨道尺寸     | string                                 | -                 |
| thumb-color      | 滑块颜色         | string                                 | -                 |
| thumb-size       | 滑块尺寸         | string                                 | -                 |
| show-value       | 是否显示值       | boolean                                | false             |
| value-position   | 值显示的位置     | 'top' \| 'right' \| 'bottom' \| 'left' | 'top' / 'right'   |
| value-background | 设置值的背景色   | string                                 | -                 |
| value-color      | 设置值的字体颜色 | string                                 | -                 |
| show-scale       | 是否显示刻度     | boolean                                | false             |
| scale-position   | 刻度显示的位置   | 'top' \| 'right' \| 'bottom' \| 'left' | 'bottom' / 'left' |
| validate-event   | 是否触发表单验证 | boolean                                | true              |

### SliderSlots

| 插槽        | 描述               | 属性              |
| ----------- | ------------------ | ----------------- |
| start-thumb | 自定义起始滑块内容 | { value: number } |
| end-thumb   | 自定义结束滑块内容 | { value: number } |

### SliderEmits

| 事件                    | 描述                             | 类型                                |
| ----------------------- | -------------------------------- | ----------------------------------- |
| update:model-value      | 滑块值实时改变时触发             | (value: number \| number[]) => void |
| input <sup>1.9.2+</sup> | 滑块值实时改变时触发             | (value: number \| number[]) => void |
| change                  | 滑块点击或拖动结束且值改变时触发 | (value: number \| number[]) => void |
| drag-start              | 开始拖动时触发                   | (event: TouchEvent) => void         |
| drag-end                | 结束拖动时触发                   | (event: TouchEvent) => void         |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')

### CSS 变量 - 暗黑模式

@code('./variables-dark.scss#variables')
