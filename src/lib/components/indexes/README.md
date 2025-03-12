---
nav: 组件
title: Indexes
subtitle: 索引
group: 导航组件
---

## 介绍

用于页面中信息快速检索，可以根据目录中的页码快速找到所需的内容。

## 引入

```ts
import Indexes from 'sard-uniapp/components/indexes/indexes.vue'
import IndexesAnchor from 'sard-uniapp/components/indexes-anchor/indexes-anchor.vue'
```

## 代码演示

### 基础使用

`Indexes` 里面的 `IndexesAnchor` 组件会被收集起来，用于放置锚点和自动生成右侧的导航。导航和锚点会有一个联动效果。

@code('${DEMO_PATH}/indexes/demo/Basic.vue')

`AreaCode.vue`

@code('${DEMO_PATH}/indexes/demo/AreaCode.vue')

`AreaCodeSearch.vue`

@code('${DEMO_PATH}/indexes/demo/AreaCodeSearch.vue')

## API

### IndexesProps

| 属性       | 描述               | 类型             | 默认值 |
| ---------- | ------------------ | ---------------- | ------ |
| root-class | 组件根元素类名     | string           | -      |
| root-style | 组件根元素样式     | StyleValue       | -      |
| current    | 设置当前活动的锚点 | number \| string | -      |

### IndexesSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### IndexesEmits

| 事件                            | 描述               | 类型                             |
| ------------------------------- | ------------------ | -------------------------------- |
| update:current <sup>1.12+</sup> | 索引发生变更时触发 | (name: number \| string) => void |
| change                          | 索引发生变更时触发 | (name: number \| string) => void |

### IndexesExpose

| 属性     | 描述           | 类型                             |
| -------- | -------------- | -------------------------------- |
| scrollTo | 滚动到指定锚点 | (name: string \| number) => void |
| update   | 更新锚点位置   | () => void                       |

### IndexesAnchorProps

| 属性       | 描述           | 类型             | 默认值 |
| ---------- | -------------- | ---------------- | ------ |
| root-class | 组件根元素类名 | string           | -      |
| root-style | 组件根元素样式 | StyleValue       | -      |
| name       | 索引锚点名称   | number \| string | -      |

### IndexesAnchorSlots

| 插槽    | 描述                               | 属性 |
| ------- | ---------------------------------- | ---- |
| default | 自定义锚点内容，会覆盖 `name` 属性 | -    |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
