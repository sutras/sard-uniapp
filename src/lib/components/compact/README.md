---
nav: 组件
title: Compact
subtitle: 紧凑布局
group: 布局
version: 1.28+
---

## 介绍

让表单组件之间紧凑连接且合并边框。

## 引入

```ts
import Compact from 'sard-uniapp/components/compact/compact.vue'
```

## 代码演示

### 基础使用

使用 `Compact` 组件包裹按钮组件，即可将按钮变成紧凑布局。

@code('${DEMO_PATH}/compact/demo/Basic.vue')

### 块级元素

设置 `block` 属性，按钮会撑满父元素宽度。

@code('${DEMO_PATH}/compact/demo/Block.vue')

### 垂直排列

设置 `direction="vertical"` 可变成垂直方向的紧凑布局，目前仅支持 `Button` 组合。

@code('${DEMO_PATH}/compact/demo/Vertical.vue')

### 垂直排列块级元素

可同时设置 `direction="vertical"` 和 `block` 属性。

@code('${DEMO_PATH}/compact/demo/VerticalBlock.vue')

### 输入类组件

除了按钮，还可以放置 `input` 类组件。

@code('${DEMO_PATH}/compact/demo/Input.vue')

### 输入类组件块级元素

设置 `block` 属性让输入框撑满父元素宽度。

@code('${DEMO_PATH}/compact/demo/InputBlock.vue')

## API

### CompactProps

| 属性       | 描述                                       | 类型                       | 默认值       |
| ---------- | ------------------------------------------ | -------------------------- | ------------ |
| root-class | 组件根元素类名                             | string                     | -            |
| root-style | 组件根元素样式                             | StyleValue                 | -            |
| block      | 变成块级元素，让按钮或输入框撑满父元素宽度 | boolean                    | false        |
| direction  | 排列的方向                                 | 'horizontal' \| 'vertical' | 'horizontal' |

### CompactSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |
