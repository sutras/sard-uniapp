---
nav: 组件
title: Empty
subtitle: 空状态
group: 数据展示
---

## 介绍

空状态时的占位提示。

## 引入

```ts
import Empty from 'sard-uniapp/components/empty/empty.vue'
```

## 代码演示

### 基础使用

@code('${DEMO_PATH}/empty/demo/Basic.vue')

### 自定义描述信息

@code('${DEMO_PATH}/empty/demo/Description.vue')

### 自定义图标大小

通过配置 `iconSize` 属性可以修改图标大小。

@code('${DEMO_PATH}/empty/demo/Size.vue')

### 自定义图标

通过配置 `icon` 属性可以修改图标。

@code('${DEMO_PATH}/empty/demo/Icon.vue')

### 额外内容

额外内容会显示在底部。

@code('${DEMO_PATH}/empty/demo/Extra.vue')

## API

### EmptyProps

| 属性        | 描述           | 类型       | 默认值     |
| ----------- | -------------- | ---------- | ---------- |
| root-class  | 组件根元素类名 | string     | -          |
| root-style  | 组件根元素样式 | StyleValue | -          |
| description | 描述信息       | string     | '暂无数据' |
| icon        | 自定义图标     | string     | -          |
| icon-family | 图标字体       | string     | -          |
| icon-size   | 图标大小       | string     | -          |

### EmptySlots

| 插槽        | 描述           | 属性 |
| ----------- | -------------- | ---- |
| default     | 自定义额外内容 | -    |
| icon        | 自定义图标内容 | -    |
| description | 自定义描述内容 | -    |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
