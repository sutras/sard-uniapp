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

使用 `thumb-bg` 属性设置滑块背景色。

@code('${DEMO_PATH}/scroll-list/demo/Color.vue')

### 滚动条模式

可以设置为 `traditional` 模式，让滚动条滑块宽度根据滚动宽度大小而变化；但是在更新数据后，必须调用 `update` 方法来更新滑块宽度。

@code('${DEMO_PATH}/scroll-list/demo/Mode.vue')

## API

### ScrollListProps

| 属性            | 描述                                            | 类型                        | 默认值     |
| --------------- | ----------------------------------------------- | --------------------------- | ---------- |
| root-class      | 组件根元素类名                                  | string                      | -          |
| root-style      | 组件根元素样式                                  | StyleValue                  | -          |
| mode            | 滚动条模式                                      | 'stubborn' \| 'traditional' | 'stubborn' |
| scrollbar-bg    | 滚动条的背景色                                  | string                      | -          |
| scrollbar-width | 滚动条宽度，单位px，只用于 `stubborn` 模式      | number                      | 100        |
| thumb-bg        | 滑块的的背景色                                  | string                      | -          |
| thumb-width     | 滑块宽度，单位px，只用于 `stubborn` 模式        | number                      | 20         |
| upper-threshold | 距左边多远时（单位px），触发 scrolltoupper 事件 | number                      | 50         |
| lower-threshold | 距右边多远时（单位px），触发 scrolltolower 事件 | number                      | 50         |

#### 滚动条模式

- `stubborn`：设置固定的滑块(`thumb`)宽度，滚动宽度的大小只影响滑块的移动速度；默认，无需调用更新函数。
- `traditional`：滑块宽度受滚动宽度大小的影响，滚动宽度越大，滑块宽度越小，与浏览器滚动条类似。在更新滚动内容的视图后，需要手动调用 `update` 方法更新滑块宽度。

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

### ScrollListExpose

| 属性   | 描述                                                                  | 类型                 |
| ------ | --------------------------------------------------------------------- | -------------------- |
| update | 更新滑块宽度；在 `traditional` 模式中，在更新滚动内容的视图时必须调用 | () => Promise\<void> |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
