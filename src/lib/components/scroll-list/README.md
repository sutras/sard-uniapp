---
nav: 组件
title: ScrollList
subtitle: 横向滚动列表
group: 数据展示
version: 1.20+
---

## 介绍

给横向滚动容器添加模拟滚动条，一般用于同时展示多个商品、分类列表的场景。

## 引入

```ts
import ScrollList from 'sard-uniapp/components/scroll-list/scroll-list.vue'
```

## 代码演示

### 基础使用

在默认插槽里编写任意内容。

@code('${DEMO_PATH}/scroll-list/demo/Basic.vue')

### 滚动条颜色

使用 `scrollbar-bg` 属性设置滚动条背景色，使用 `thumb-bg` 属性设置滑块背景色。

也可以通过 css 变量设置。

@code('${DEMO_PATH}/scroll-list/demo/Color.vue')

### 异步获取数据

组件内部能够通过观察滚动内容宽度变化，动态调整滑块的宽度。

@code('${DEMO_PATH}/scroll-list/demo/Async.vue')

### 隐藏滚动条

如果滚动内容宽度小于滚动容器的宽度，会自动隐藏滚动条。

@code('${DEMO_PATH}/scroll-list/demo/HideThumb.vue')

## API

### ScrollListProps

| 属性            | 描述                                            | 类型       | 默认值 |
| --------------- | ----------------------------------------------- | ---------- | ------ |
| root-class      | 组件根元素类名                                  | string     | -      |
| root-style      | 组件根元素样式                                  | StyleValue | -      |
| scrollbar-width | 滚动条宽度                                      | string     | -      |
| scrollbar-bg    | 滚动条的背景色                                  | string     | -      |
| thumb-bg        | 滑块的的背景色                                  | string     | -      |
| upper-threshold | 距左边多远时（单位px），触发 scrolltoupper 事件 | number     | 50     |
| lower-threshold | 距右边多远时（单位px），触发 scrolltolower 事件 | number     | 50     |

### ScrollListSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### ScrollListEmits

| 事件          | 描述             | 类型                  |
| ------------- | ---------------- | --------------------- |
| scroll        | 滚动时触发       | ( event: any) => void |
| scrolltoupper | 滚动到左边时触发 | ( event: any) => void |
| scrolltolower | 滚动到右边时触发 | ( event: any) => void |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
