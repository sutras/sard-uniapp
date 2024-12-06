---
nav: 组件
title: SwiperDot
subtitle: 轮播图指示点
group: 数据展示
---

## 介绍

自定义轮播图指示点。

## 引入

```ts
import SwiperDot from 'sard-uniapp/components/swiper-dot/swiper-dot.vue'
```

## 代码演示

### 基础使用

使用一个相对定位的容器包裹轮播图组件和轮播图指示点组件，
使用 `current` 属性设置活动指示点，使用 `type` 属性设置指示点类型，使用 `total` 属性设置指示点总数或者使用 `list` 属性设置指示文本（用于 `title` 类型）。

@code('${DEMO_PATH}/swiper-dot/demo/Basic.vue')

## API

### SwiperDotProps

| 属性       | 描述                                 | 类型                                                   | 默认值  |
| ---------- | ------------------------------------ | ------------------------------------------------------ | ------- |
| root-class | 组件根元素类名                       | string                                                 | -       |
| root-style | 组件根元素样式                       | StyleValue                                             | -       |
| type       | 指示点类型                           | 'dot' \| 'dot-bar' \| 'index' \| 'title' \| 'fraction' | 'dot'   |
| current    | 当前指示点索引                       | number                                                 | 0       |
| total      | 指示点总数                           | number                                                 | 0       |
| list       | 用于 `title` 类型的文本数据          | any[]                                                  | -       |
| field      | `type` 为 `title` 时，显示的内容字段 | string                                                 | 'title' |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
