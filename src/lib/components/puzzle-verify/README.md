---
nav: 组件
title: PuzzleVerify
subtitle: 拼图验证
group: 其他
version: 1.26+
---

## 介绍

根据提示滑动滑块使拼成完整一张图来完成验证。此组件基于 `SlideVerify` 组件。

## 引入

```ts
import PuzzleVerify from 'sard-uniapp/components/puzzle-verify/puzzle-verify.vue'
```

## 代码演示

### 基础使用

用法同 `SlideVerify`，仅多了一个 `src` 属性以展示图片的形式来代替虚线目标框。

图片宽度 100%，高度自适应，为避免图片未加载完时位置被占领，可设置 `aspect-ratio` 属性让容器占据一定高度。

@code('${DEMO_PATH}/puzzle-verify/demo/Basic.vue')

## API

### PuzzleVerifyProps

继承 [`SlideVerifyProps`](./slide-verify#SlideVerifyProps) 并有以下额外属性：

| 属性         | 描述                         | 类型   | 默认值    |
| ------------ | ---------------------------- | ------ | --------- |
| src          | 图片资源地址                 | string | -         |
| aspect-ratio | 图片宽高比，用于占位图片高度 | number | 320 / 240 |

### PuzzleVerifyEmits

继承 [`SlideVerifyEmits`](./slide-verify#SlideVerifyEmits)

### PuzzleVerifyExpose

继承 [`SlideVerifyExpose`](./slide-verify#SlideVerifyExpose)

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
