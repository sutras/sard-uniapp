---
nav: 组件
title: Avatar
subtitle: 头像
group: 数据展示
---

## 介绍

用图片、图标或字符等来展示头像、群、库等事物信息。

## 引入

```ts
import Avatar from 'sard-uniapp/components/avatar/avatar.vue'
import AvatarGroup from 'sard-uniapp/components/avatar-group/avatar-group.vue'
```

## 代码演示

### 基础使用

默认展示一个人头图标。

@code('${DEMO_PATH}/avatar/demo/Basic.vue')

### 形状

设置 `shape="square" ` 将其改为带圆角的方形。

@code('${DEMO_PATH}/avatar/demo/Shape.vue')

### 尺寸

`size` 设置头像大小，`iconSize` 设置图标大小。

@code('${DEMO_PATH}/avatar/demo/Size.vue')

### 自定义样式

`background` 设置头像背景色，`color` 设置图标颜色。

@code('${DEMO_PATH}/avatar/demo/Style.vue')

### 图片类型

设置 `src` 图片路径将展示一个完全覆盖框框的图片。

@code('${DEMO_PATH}/avatar/demo/Picture.vue')

### 自定义内容

默认插槽配置的内容会代替默认的内容。

@code('${DEMO_PATH}/avatar/demo/Children.vue')

### 额外内容

`extra` 属性可以展示例如徽标等组件。要使徽标固定在圆角形状头像右上角边上可以使用 `14.6447%` 的固定值。

@code('${DEMO_PATH}/avatar/demo/Extra.vue')

### 头像组 <sup>1.24.5+</sup>

把一组 `Avatar` 组件放置在 `AvatarGroup` 组件里面，可形成层叠效果的头像组。

`AvatarGroup` 组件需传递 `total` 和 `max` 属性，以便计算省略的头像数。

@code('${DEMO_PATH}/avatar/demo/Group.vue')

### 实际头像数不超过最大数 <sup>1.24.5+</sup>

实际头像数不超过最大数时，会隐藏剩余数量显示。

@code('${DEMO_PATH}/avatar/demo/GroupLess.vue')

### 覆盖面 <sup>1.24.5+</sup>

使用 `coverage` 属性设置头像间的覆盖面，设置0时不覆盖，设置1时完全覆盖。

@code('${DEMO_PATH}/avatar/demo/GroupCoverage.vue')

## API

### AvatarProps

| 属性                     | 描述                                         | 类型                 | 默认值   |
| ------------------------ | -------------------------------------------- | -------------------- | -------- |
| root-class               | 组件根元素类名                               | string               | -        |
| root-style               | 组件根元素样式                               | StyleValue           | -        |
| shape                    | 头像形状                                     | 'circle' \| 'square' | 'circle' |
| size                     | 头像尺寸                                     | string               | -        |
| icon-size                | 图标尺寸                                     | string               | -        |
| src                      | 图片类型头像的图片地址                       | string               | -        |
| index <sup>1.24.5+</sup> | 位于头像组中时必传，当前头像在头像组中的下标 | number               | -        |

### AvatarSlots

| 插槽    | 描述                     | 属性 |
| ------- | ------------------------ | ---- |
| default | 自定义默认内容           | -    |
| extra   | 额外内容，常用于展示徽标 | -    |

### AvatarEmits

| 事件                     | 描述       | 类型                 |
| ------------------------ | ---------- | -------------------- |
| click <sup>1.24.5+</sup> | 点击时触发 | (event: any) => void |

### AvatarGroupProps <sup>1.24.5+</sup>

| 属性        | 描述                     | 类型              | 默认值 |
| ----------- | ------------------------ | ----------------- | ------ |
| root-class  | 组件根元素类名           | string            | -      |
| root-style  | 组件根元素样式           | StyleValue        | -      |
| max         | 最大头像展示数量，必填   | number            | -      |
| total       | 总的头像个数，必填       | number            | -      |
| coverage    | 头像间的覆盖面           | number            | 0.5    |
| show-remain | 是否显示剩余头像数量     | boolean           | true   |
| remain-text | 自定义剩余头像数量的内容 | string \| boolean | -      |

### AvatarGroupSlots <sup>1.24.5+</sup>

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### AvatarGroupEmits <sup>1.24.5+</sup>

| 事件                            | 描述               | 类型                 |
| ------------------------------- | ------------------ | -------------------- |
| remain-click <sup>1.24.5+</sup> | 点击剩余数量时触发 | (event: any) => void |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
