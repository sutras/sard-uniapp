---
nav: 组件
title: List
subtitle: 列表
group: 数据展示
---

## 介绍

显示一组垂直排列的数据。

## 引入

```ts
import List from 'sard-uniapp/components/list/list.vue'
import ListItem from 'sard-uniapp/components/list-item/list-item.vue'
```

## 代码演示

### 基础使用

可以给列表项添加标题、描述和值。

@code('${DEMO_PATH}/list/demo/Basic.vue')

### 可链接的

设置 `arrow` 属性会显示右边的箭头，设置 `hover` 属性会有点击状态。

@code('${DEMO_PATH}/list/demo/Linkable.vue')

### 图标

设置 `icon` 属性或插槽可以在左边显示图标。

@code('${DEMO_PATH}/list/demo/Icon.vue')

### 自定义内容

列表项的 `body` 和 `footer` 默认平分水平空间，如果 `footer` 需要占据更多的空间，可以设置 `body` 不扩展。

`value` 中的元素默认会向右边靠，如果有使用 `footer` 属性定义内容，则内容会纵向排列。

@code('${DEMO_PATH}/list/demo/Slot.vue')

### 列表标题和描述

列表标题和描述可以对整个列表进行说明

@code('${DEMO_PATH}/list/demo/Group.vue')

### 卡片风格

可以使用 `card` 属性让列表显示为卡片风格。

@code('${DEMO_PATH}/list/demo/Card.vue')

### 隐藏边框 <sup>1.21.0+</sup>

可以使用 `hide-border` 属性隐藏边框。

@code('${DEMO_PATH}/list/demo/HideBorder.vue')

## API

### ListProps

| 属性                           | 描述           | 类型             | 默认值 |
| ------------------------------ | -------------- | ---------------- | ------ |
| root-class                     | 组件根元素类名 | string           | -      |
| root-style                     | 组件根元素样式 | StyleValue       | -      |
| title                          | 列表顶部标题   | string \| number | -      |
| description                    | 列表底部描述   | string \| number | -      |
| card                           | 卡片风格       | boolean          | false  |
| inlaid                         | 嵌入式列表     | boolean          | false  |
| hide-border <sup>1.21.0+</sup> | 是否隐藏边框   | boolean          | false  |

### ListSlots

| 插槽        | 描述                                    | 属性 |
| ----------- | --------------------------------------- | ---- |
| default     | 自定义默认内容                          | -    |
| title       | 自定义标题内容，会覆盖`title`属性       | -    |
| description | 自定义描述内容，会覆盖`description`属性 | -    |

### ListItemProps

| 属性            | 描述                         | 类型                      | 默认值  |
| --------------- | ---------------------------- | ------------------------- | ------- |
| root-class      | 组件根元素类名               | string                    | -       |
| root-style      | 组件根元素样式               | StyleValue                | -       |
| title           | 左侧标题                     | string \| number          | -       |
| description     | 标题下方的描述               | string \| number          | -       |
| value           | 右侧值                       | string \| number          | -       |
| hover           | 是否开启点击反馈             | boolean                   | false   |
| arrow           | 是否展示右侧箭头             | boolean                   | false   |
| arrow-direction | 箭头方向                     | 'up' \| 'right' \| 'down' | 'right' |
| icon            | 左侧图标名称，可以为图片路径 | string                    | -       |
| icon-size       | 图标尺寸                     | string                    | -       |
| icon-color      | 图标颜色                     | string                    | -       |
| icon-family     | 图标字体名称                 | string                    | -       |

### ListItemSlots

| 插槽        | 描述                                    | 属性 |
| ----------- | --------------------------------------- | ---- |
| default     | 自定义默认内容，会覆盖所有内容          | -    |
| title       | 自定义标题内容，会覆盖`title`属性       | -    |
| description | 自定义描述内容，会覆盖`description`属性 | -    |
| value       | 自定义值内容，会覆盖`value`属性         | -    |
| arrow       | 自定义箭头                              | -    |
| icon        | 自定义左侧图标，会覆盖`icon`属性        | -    |

### ListItemEmits

| 事件  | 描述             | 类型                 |
| ----- | ---------------- | -------------------- |
| click | 点击列表项时触发 | (event: any) => void |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
