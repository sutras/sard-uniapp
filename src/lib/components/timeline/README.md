---
nav: 组件
title: Timeline
subtitle: 时间轴
group: 数据展示
version: 1.6+
---

## 介绍

垂直展示的时间流信息。

## 引入

```ts
import Timeline from 'sard-uniapp/components/timeline/timeline.vue'
import TimelineItem from 'sard-uniapp/components/timeline-item/timeline-item.vue'
```

## 代码演示

### 基础使用

@code('${DEMO_PATH}/timeline/demo/Basic.vue')

## API

### TimelineProps

| 属性       | 描述           | 类型       | 默认值 |
| ---------- | -------------- | ---------- | ------ |
| root-class | 组件根元素类名 | string     | -      |
| root-style | 组件根元素样式 | StyleValue | -      |

### TimelineSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### TimelineItemProps

| 属性        | 描述           | 类型       | 默认值 |
| ----------- | -------------- | ---------- | ------ |
| root-class  | 组件根元素类名 | string     | -      |
| root-style  | 组件根元素样式 | StyleValue | -      |
| title       | 标题内容       | string     | -      |
| time        | 时间内容       | string     | -      |
| icon        | 自定义图标     | string     | -      |
| icon-family | 图标字体       | string     | -      |
| icon-color  | 图标颜色       | string     | -      |

### TimelineItemSlots

| 插槽    | 描述                                | 属性 |
| ------- | ----------------------------------- | ---- |
| default | 自定义默认内容                      | -    |
| icon    | 自定义图标内容，会覆盖 `icon` 属性  | -    |
| title   | 自定义标题内容，会覆盖 `title` 属性 | -    |
| time    | 自定义时间内容，会覆盖 `time` 属性  | -    |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
