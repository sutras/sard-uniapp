---
nav: 组件
title: Sticky
subtitle: 粘性布局
group: 布局
version: 1.20+
---

## 介绍

粘性布局组件，用于在页面滚动时将元素固定在指定位置。

css 的粘性定位有更好的性能和体验，如果能满足需求，则不需要使用 `Sticky` 组件。

`Sticky` 组件通常用于需要粘性定位的元素受父元素范围限制的情景，因为 `Sticky` 组件能跳脱父元素的范围限制。

@info

需在模拟器或移动设备上查看效果，因为 `uni.createIntersectionObserver` 在 pc 端获取的数据是不正确的。

@endinfo

## 引入

```ts
import Sticky from 'sard-uniapp/components/sticky/sticky.vue'
import StickyBox from 'sard-uniapp/components/sticky-box/sticky-box.vue'
```

## 代码演示

### 吸顶

使用 `offset-top` 设置粘性定位元素距离视窗顶部的距离。

如果是自定义导航栏，则需要自行加上状态栏和导航栏的高度。

黏住视窗状态时使用的是 `fixed` 定位。

@code('${DEMO_PATH}/sticky/demo/OffsetTop.vue')

### 动态插入

即使是动态插入的数据，`Sticky` 组件也能重新计算其位置。

@code('${DEMO_PATH}/sticky/demo/Dynamic.vue')

### 吸底

使用 `offset-bottom` 设置粘性定位元素距离视窗底部的距离。

@code('${DEMO_PATH}/sticky/demo/OffsetBottom.vue')

### 吸顶和吸底

可以同时使用 `offset-top` 和 `offset-bottom` 设置粘性定位元素距离视窗顶部和底部的距离。

@code('${DEMO_PATH}/sticky/demo/OffsetTopBottom.vue')

### 容器中的吸顶

如果要将元素限制在某个范围之内，可以使用 `StickyBox` 组件包裹着 `Sticky` 组件。

黏住 `StickyBox` 组件状态时使用的是 `absolute` 定位，因此 `Sticky` 组件不能被其他含有响应其绝对定位于 `StickyBox` 的定位样式的元素包裹。

@code('${DEMO_PATH}/sticky/demo/BoxTop.vue')

### 容器中的吸底

@code('${DEMO_PATH}/sticky/demo/BoxBottom.vue')

### 容器中的吸顶和吸底

@code('${DEMO_PATH}/sticky/demo/BoxTopBottom.vue')

## API

### StickyProps

| 属性          | 描述             | 类型       | 默认值 |
| ------------- | ---------------- | ---------- | ------ |
| root-class    | 组件根元素类名   | string     | -      |
| root-style    | 组件根元素样式   | StyleValue | -      |
| offset-top    | 吸顶距离，单位px | number     | -      |
| offset-bottom | 吸底距离，单位px | number     | -      |
| z-index       | 粘性元素的层级   | number     | -      |

### StickySlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |
