---
nav: 组件
title: Layout
subtitle: 布局
group: 布局
---

## 介绍

基于行/列来划分区块以展示内容。栅格系统提供了 12 列容器来布局，需要配套使用`Row`和`Col`组件。

## 引入

```ts
import Row from 'sard-uniapp/components/row/row.vue'
import Col from 'sard-uniapp/components/col/col.vue'
```

## 代码演示

### 基础使用

使用`span`属性配置子元素占据的列数。

@code('${DEMO_PATH}/layout/demo/Basic.vue')

### 列偏移

使用`offset`可以将列向右侧偏。

@code('${DEMO_PATH}/layout/demo/Offset.vue')

### 水平对齐

`justify`属性可以配置子元素在父容器中的水平对齐方式。

@code('${DEMO_PATH}/layout/demo/Justify.vue')

### 垂直对齐

`align`属性可以配置子元素在父容器中的垂直对齐方式。

@code('${DEMO_PATH}/layout/demo/Align.vue')

### 列间距

`gap`属性可以配置子元素之间的距离。

@code('${DEMO_PATH}/layout/demo/Gap.vue')

### 列顺序

通过`order`来改变元素的排序。

@code('${DEMO_PATH}/layout/demo/Order.vue')

## API

### RowProps

| 属性       | 描述           | 类型                                                              | 默认值 |
| ---------- | -------------- | ----------------------------------------------------------------- | ------ |
| root-class | 组件根元素类名 | string                                                            | -      |
| root-style | 组件根元素样式 | StyleValue                                                        | -      |
| gap        | 列间距         | string                                                            | -      |
| justify    | 水平对齐方式   | 'start' \| 'center' \| 'end' \| 'around' \| 'between' \| 'evenly' | -      |
| align      | 垂直对齐方式   | 'start' \| 'center' \| 'end' \| 'stretch'                         | -      |

### RowSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### ColProps

| 属性       | 描述           | 类型                       | 默认值 |
| ---------- | -------------- | -------------------------- | ------ |
| root-class | 组件根元素类名 | string                     | -      |
| root-style | 组件根元素样式 | StyleValue                 | -      |
| span       | 列元素宽度     | number \| 'auto' \| 'none' | -      |
| offset     | 列元素偏移距离 | number                     | -      |
| order      | 列元素顺序     | number                     | -      |

### ColSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |
