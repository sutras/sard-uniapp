---
nav: 组件
title: Space
subtitle: 间距
group: 布局
---

## 介绍

设置组件之间的间距。

## 引入

```ts
import Space from 'sard-uniapp/components/space/space.vue'
```

## 代码演示

### 基础使用

最基础的用法，通过间距组件来给组件之间提供统一的间距。

@code('${DEMO_PATH}/space/demo/Basic.vue')

### 垂直布局

使用 `direction` 来控制布局的方式, 背后实际上是利用了 `flex-direction` 来控制。

@code('${DEMO_PATH}/space/demo/Vertical.vue')

### 间距大小

通过调整 `size` 的值来控制间距的大小。

使用内置的 `small、middle、large` 来设置间距大小。

@code('${DEMO_PATH}/space/demo/Size.vue')

### 自定义间距大小

很多时候，内建的大小不满足设计师的要求，我们可以通过传入自己定义的大小来设置。

@code('${DEMO_PATH}/space/demo/CustomSize.vue')

### 自动换行

在 `horizontal` 模式下，通过使用 `wrap` 来控制自动换行行为。

@code('${DEMO_PATH}/space/demo/Wrap.vue')

### 对齐

设置该值可以调整所有子节点在容器内的对齐方式，可设置的值与 `align-items` 一致。

@code('${DEMO_PATH}/space/demo/Align.vue')

## API

### SpaceProps

| 属性                       | 描述             | 类型                                                             | 默认值       |
| -------------------------- | ---------------- | ---------------------------------------------------------------- | ------------ |
| root-class                 | 组件根元素类名   | string                                                           | -            |
| root-style                 | 组件根元素样式   | StyleValue                                                       | -            |
| direction                  | 排列的方向       | 'vertical' \| 'horizontal'                                       | 'horizontal' |
| size                       | 间隔大小         | 'small' \| 'middle' \| 'large' \| string                         | 'middle'     |
| align                      | 垂直排布方式     | 'start' \| 'end' \| 'center' \| 'baseline'                       | -            |
| justify <sup>1.14.2+</sup> | 水平排布方式     | 'start' \| 'end' \| 'center' \| 'between'\| 'around' \| 'evenly' | -            |
| wrap                       | 设置是否自动折行 | boolean                                                          | false        |

### SpaceSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
