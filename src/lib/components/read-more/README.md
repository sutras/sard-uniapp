---
nav: 组件
title: ReadMore
subtitle: 阅读更多
group: 数据展示
version: 1.20+
---

## 介绍

该组件一般用于内容较长，预先收起一部分，点击再展开全部内容的场景。

## 引入

```ts
import ReadMore from 'sard-uniapp/components/read-more/read-more.vue'
```

## 代码演示

### 基础使用

在默认插槽放置任意内容，默认会收起来，点击展开按钮时全部显示。

为了避免滚动到一定位置再收起来的位置跳跃，可以使用 `keep-location` 属性保持收起后，按钮下面的内容依然在屏幕中原来的位置。

只可用在页面滚动中，如果在 `scroll-view` 中，需要在 `close` 事件回调中自行实现。

@code('${DEMO_PATH}/read-more/demo/Basic.vue')

### 收起时最大高度

可以使用 `max-height` 设置收起时的最大高度。

@code('${DEMO_PATH}/read-more/demo/MaxHeight.vue')

### 按钮文案

使用 `open-text` 和 `close-text` 设置展开状态和收起状态时的按钮文案。

@code('${DEMO_PATH}/read-more/demo/Text.vue')

### 隐藏收起按钮

设置 `hide-close` 后，在展开时不会再显示收起按钮。

@code('${DEMO_PATH}/read-more/demo/HideClose.vue')

## API

### ReadMoreProps

| 属性              | 描述                                                           | 类型       | 默认值 |
| ----------------- | -------------------------------------------------------------- | ---------- | ------ |
| root-class        | 组件根元素类名                                                 | string     | -      |
| root-style        | 组件根元素样式                                                 | StyleValue | -      |
| max-height        | 收起时最大展示高度                                             | number     | 200    |
| hide-close        | 是否隐藏收起按钮，打开后就不能手动收起来了                     | boolean    | false  |
| open-text         | 展开状态按钮文案                                               | string     | '收起' |
| close-text        | 收起状态按钮文案                                               | string     | '展开' |
| visible (v-model) | 控制展开和收起                                                 | boolean    | false  |
| keep-location     | 收起时保持按钮下面的内容在屏幕中原来的位置，只可用在页面滚动中 | boolean    | false  |

### ReadMoreSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### ReadMoreEmits

| 事件           | 描述            | 类型                      |
| -------------- | --------------- | ------------------------- |
| update:visible | 展开/收起时触发 | (visible: boolean)=> void |
| open           | 展开时触发      | () => void                |
| close          | 收起时触发      | () => void                |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
