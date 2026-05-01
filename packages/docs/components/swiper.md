---
title: Swiper
subtitle: 轮播图
group: 数据展示
version: 1.30+
---

## 介绍

滑动切换视图容器，可运用于banner轮播图等场景。

## 引入

```ts
import Swiper from 'sard-uniapp/components/swiper/swiper.vue'
```

## 代码演示

### 基础使用

使用 `list` 属性传入轮播数据，支持字符串和对象两种格式。当传入字符串时，组件会将其作为图片地址进行渲染；当传入对象时，可以通过 `image`、`title`、`video` 和 `poster` 属性分别指定图片地址、标题文本、视频地址和视频封面地址。

<<< @demo/swiper/demo/Basic.vue

### 指示点类型

使用 `dot-type` 属性可以设置指示点的类型。

<<< @demo/swiper/demo/DotType.vue

### 标题类型

使用 `dot-type` 属性设置为 `title` 时，可以在指示点上显示标题文本。

<<< @demo/swiper/demo/Title.vue

### 嵌入视频

使用 `video` 属性可以在轮播中嵌入视频，并通过 `poster` 属性设置视频封面。切换到视频时会自动播放，切换离开时会自动暂停。

<<< @demo/swiper/demo/Video.vue

### 多项展示

使用 `display-multiple-items` 属性可以设置同时展示的滑块数量。

<<< @demo/swiper/demo/MultipleItems.vue

### 缩放效果

通过 `dynamic-item-style` 属性可以为滑块设置动态样式，实现缩放等效果。使用 `previous-margin` 和 `next-margin` 属性可以设置前后滑块的边距，配合缩放效果可以实现更好的视觉效果。

<<< @demo/swiper/demo/Scale.vue

## API

### SwiperProps

| 属性                   | 描述               | 类型                                                   | 默认值 |
| ---------------------- | ------------------ | ------------------------------------------------------ | ------ |
| root-class             | 组件根元素类名     | string                                                 | -      |
| root-style             | 组件根元素样式     | StyleValue                                             | -      |
| model-value            | 当前滑块的下标     | number                                                 | 0      |
| list                   | 滑块列表数据       | (string \| SwiperItem)[]                               | []     |
| show-dot               | 是否显示指示点     | boolean                                                | true   |
| dot-type               | 指示点类型         | 'dot' \| 'dot-bar' \| 'index' \| 'title' \| 'fraction' | 'dot'  |
| autoplay               | 是否自动播放       | boolean                                                | true   |
| interval               | 自动播放间隔时间   | number                                                 | 5000   |
| duration               | 滑动动画时长       | number                                                 | 500    |
| circular               | 是否启用循环       | boolean                                                | false  |
| previous-margin        | 前边距             | string                                                 | '0px'  |
| next-margin            | 后边距             | string                                                 | '0px'  |
| display-multiple-items | 同时展示的滑块数量 | number                                                 | 1      |
| swiper-item-style      | 滑块样式           | StyleValue                                             | -      |
| item-style             | 滑块内元素样式     | StyleValue                                             | -      |
| dynamic-item-style     | 动态滑块内元素样式 | (index: number, activeIndex: number) => StyleValue     | -      |

### SwiperItem

| 属性   | 描述         | 类型   |
| ------ | ------------ | ------ |
| image  | 图片地址     | string |
| title  | 标题文本     | string |
| video  | 视频地址     | string |
| poster | 视频封面地址 | string |

### SwiperEmits

| 事件               | 描述           | 类型                    |
| ------------------ | -------------- | ----------------------- |
| click              | 点击滑块时触发 | (index: number) => void |
| update:model-value | 滑块切换时触发 | (index: number) => void |
| change             | 滑块切换时触发 | (index: number) => void |

## 主题定制

### CSS 变量

<<< @comp/swiper/variables.scss#variables
