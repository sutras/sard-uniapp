---
nav: 组件
title: RotateVerify
subtitle: 旋转验证
group: 其他
version: 1.26+
---

## 介绍

根据提示滑动滑块使图片角度为正来完成验证。此组件基于 `SlideVerify` 组件。

## 引入

```ts
import RotateVerify from 'sard-uniapp/components/rotate-verify/rotate-verify.vue'
```

## 代码演示

### 基础使用

用法同 `SlideVerify`，仅多了一个 `src` 属性以展示图片的形式来代替虚线目标框。

@code('${DEMO_PATH}/rotate-verify/demo/Basic.vue')

## API

### RotateVerifyProps

继承 [`SlideVerifyProps`](./slide-verify#SlideVerifyProps) 并有以下额外属性：

| 属性 | 描述         | 类型   | 默认值 |
| ---- | ------------ | ------ | ------ |
| src  | 图片资源地址 | string | -      |

### RotateVerifyEmits

继承 [`SlideVerifyEmits`](./slide-verify#SlideVerifyEmits)

### RotateVerifyExpose

继承 [`SlideVerifyExpose`](./slide-verify#SlideVerifyExpose)

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
