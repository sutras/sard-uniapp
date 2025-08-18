---
nav: 组件
title: CoolIcon
subtitle: 酷炫图标
group: 数据展示
version: 1.24+
---

## 介绍

为一般的图标添加颜色、外框、背景和装饰物等元素，让其变得炫酷，可在缺少设计时也能展示不一般的效果。

## 引入

```ts
import CoolIcon from 'sard-uniapp/components/cool-icon/cool-icon.vue'
```

## 代码演示

### 椭圆

把图标放置在默认插槽，使用 `background` 属性设置外框背景色，使用 `color` 属性设置图标颜色，使用 `shape="oval"` 属性设置外框为椭圆形，就能得到一个精致漂亮的图标。

@code('${DEMO_PATH}/cool-icon/demo/Oval.vue')

### 圆形

使用 `shape="circle"` 属性设置外框为圆形。

@code('${DEMO_PATH}/cool-icon/demo/Circle.vue')

### 方形

使用 `shape="square"` 属性设置外框为方形。

@code('${DEMO_PATH}/cool-icon/demo/Square.vue')

### 三角形

使用 `shape="triangle"` 属性设置外框为三角形。

@code('${DEMO_PATH}/cool-icon/demo/Triangle.vue')

### 花朵

使用 `shape="flower"` 属性设置外框为花朵形状。

@code('${DEMO_PATH}/cool-icon/demo/Flower.vue')

### 尺寸

使用 `size` 属性设置外框尺寸，使用 `icon-size` 设置图标尺寸。

@code('${DEMO_PATH}/cool-icon/demo/Size.vue')

## API

### CoolIconProps

| 属性       | 描述               | 类型                                                     | 默认值 |
| ---------- | ------------------ | -------------------------------------------------------- | ------ |
| root-class | 组件根元素类名     | string                                                   | -      |
| root-style | 组件根元素样式     | StyleValue                                               | -      |
| shape      | 设置外框的形状     | 'circle' \| 'square' \| 'oval' \| 'triangle' \| 'flower' | 'oval' |
| color      | 设置图标颜色       | string                                                   | -      |
| background | 设置外框背景色颜色 | string                                                   | -      |
| size       | 设置外框尺寸       | string                                                   | -      |
| icon-size  | 设置图标尺寸       | string                                                   | -      |

### CoolIconSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
