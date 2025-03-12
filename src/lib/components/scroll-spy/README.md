---
nav: 组件
title: ScrollSpy
subtitle: 滚动监听
group: 数据展示
version: 1.12+
---

## 介绍

实时告知当前处于屏幕中的锚点，或者滚动到指定锚点位置。

## 引入

```ts
import ScrollSpy from 'sard-uniapp/components/scroll-spy/scroll-spy.vue'
import ScrollSpyAnchor from 'sard-uniapp/components/scroll-spy-anchor/scroll-spy-anchor.vue'
```

## 代码演示

### 基础使用

`ScrollSpy` 组件内部使用 `scroll-view` 作为滚动容器，需要设置固定的高度。
`ScrollSpyAnchor` 是用作定位的锚点，需要设置 `name` 属性，且其值必须唯一。

使用 `v-model:current` 绑定当前的锚点。

@code('${DEMO_PATH}/scroll-spy/demo/Basic.vue')

### 动态更新

如果锚点的位置有变动，或者新增/删除了锚点，需要调用 `update` 方法重新计算锚点位置。

@code('${DEMO_PATH}/scroll-spy/demo/Update.vue')

## API

### ScrollSpyProps

| 属性            | 描述                                                  | 类型             | 默认值 |
| --------------- | ----------------------------------------------------- | ---------------- | ------ |
| root-class      | 组件根元素类名                                        | string           | -      |
| root-style      | 组件根元素样式                                        | StyleValue       | -      |
| current         | 当前绑定锚点名称                                      | string \| number | -      |
| offset          | 锚点距离顶部的偏移量                                  | number           | 0      |
| upper-threshold | 距顶部/左边多远时（单位 px），触发 scrolltoupper 事件 | number \| string | 50     |
| lower-threshold | 距底部/右边多远时（单位 px），触发 scrolltolower 事件 | number \| string | 50     |

### ScrollSpySlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### ScrollSpyEmits

| 事件           | 描述               | 类型                             |
| -------------- | ------------------ | -------------------------------- |
| update:current | 当前锚点改变时触发 | (name: number \| string) => void |
| change         | 当前锚点改变时触发 | (name: number \| string) => void |
| scrolltoupper  | 滚动到顶部时触发   | () => void                       |
| scrolltolower  | 滚动到底部时触发   | () => void                       |
| scroll         | 滚动时触发         | (event: any) => void             |

### ScrollSpyExpose

| 属性   | 描述         | 类型       |
| ------ | ------------ | ---------- |
| update | 更新锚点位置 | () => void |
