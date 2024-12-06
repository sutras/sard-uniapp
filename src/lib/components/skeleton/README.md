---
nav: 组件
title: Skeleton
subtitle: 骨架屏
group: 反馈组件
---

## 介绍

在内容加载过程中提供一组占位图形，通常图形会描述内容的概要排版。

## 引入

```ts
import Skeleton from 'sard-uniapp/components/skeleton/skeleton.vue'
import SkeletonBlock from 'sard-uniapp/components/skeleton-block/skeleton-block.vue'
import SkeletonAvatar from 'sard-uniapp/components/skeleton-avatar/skeleton-avatar.vue'
import SkeletonTitle from 'sard-uniapp/components/skeleton-title/skeleton-title.vue'
import SkeletonParagraph from 'sard-uniapp/components/skeleton-paragraph/skeleton-paragraph.vue'
```

## 代码演示

### 基础使用

默认展示三行占位元素。

@code('${DEMO_PATH}/skeleton/demo/Basic.vue')

### 显示标题

设置 `title` 属性显示标题占位元素。

@code('${DEMO_PATH}/skeleton/demo/Title.vue')

### 显示头像

设置 `avatar` 属性显示头像占位元素。

@code('${DEMO_PATH}/skeleton/demo/Avatar.vue')

### 圆形头像

设置 `avatarRound` 属性显示头圆形像占位元素。

@code('${DEMO_PATH}/skeleton/demo/RoundAvatar.vue')

### 圆角标题和段落

设置 `round` 属性显示圆角标题和段落。

@code('${DEMO_PATH}/skeleton/demo/RoundTitle.vue')

### 动画效果

设置 `animated` 属性显示动画效果。

@code('${DEMO_PATH}/skeleton/demo/Animated.vue')

### 包含子组件

将 `loading` 属性设置成 `false` 表示内容加载完成，此时会隐藏占位图。

@code('${DEMO_PATH}/skeleton/demo/Contain.vue')

### 自定义

可以通过 `SkeletonBlock`、`SkeletonAvatar`、`SkeletonTitle`、`SkeletonParagraph` 自由组合使用。

@code('${DEMO_PATH}/skeleton/demo/Custom.vue')

## API

### SkeletonProps

| 属性         | 描述                                          | 类型             | 默认值 |
| ------------ | --------------------------------------------- | ---------------- | ------ |
| root-class   | 组件根元素类名                                | string           | -      |
| root-style   | 组件根元素样式                                | StyleValue       | -      |
| rows         | 段落行数                                      | number           | 3      |
| title        | 是否显示标题                                  | boolean          | false  |
| avatar       | 是否显示头像                                  | boolean          | false  |
| avatar-size  | 头像尺寸                                      | number \| string | -      |
| avatar-round | 是否显示圆形头像                              | boolean          | true   |
| round        | 是否将标题和段落显示为圆角风格                | boolean          | false  |
| loading      | 是否显示骨架屏，传 `false` 时会展示子组件内容 | boolean          | true   |
| animated     | 是否开启动画                                  | boolean          | false  |

### SkeletonBlockProps

| 属性       | 描述               | 类型       | 默认值 |
| ---------- | ------------------ | ---------- | ------ |
| root-class | 组件根元素类名     | string     | -      |
| root-style | 组件根元素样式     | StyleValue | -      |
| animated   | 是否开启动画       | boolean    | false  |
| round      | 是否显示为圆角风格 | boolean    | false  |
| width      | 设置宽度           | string     | -      |
| height     | 设置高度           | string     | -      |

### SkeletonAvatarProps

继承 `SkeletonBlockProps` 并有以下额外属性：

| 属性 | 描述     | 类型   | 默认值 |
| ---- | -------- | ------ | ------ |
| size | 头像尺寸 | string | -      |

### SkeletonTitleProps

继承 `SkeletonBlockProps`。

### SkeletonParagraphProps

继承 `SkeletonBlockProps` 并有以下额外属性：

| 属性 | 描述     | 类型   | 默认值 |
| ---- | -------- | ------ | ------ |
| rows | 段落行数 | number | 3      |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')

### CSS 变量 - 暗黑模式

@code('./variables-dark.scss#variables')
