---
nav: 组件
title: Result
subtitle: 结果
group: 反馈组件
---

## 介绍

用于反馈用户的操作结果。

## 引入

```ts
import Result from 'sard-uniapp/components/result/result.vue'
```

## 代码演示

### 基础使用

设置 `status` 属性展示不同状态的结果。

@code('${DEMO_PATH}/result/demo/Basic.vue')

### 额外内容

默认插槽内容会在底部展示。

@code('${DEMO_PATH}/result/demo/Extra.vue')

### 自定义图标

通过 `icon` 属性设置自定义图标。

@code('${DEMO_PATH}/result/demo/Icon.vue')

## API

### ResultProps

| 属性        | 描述           | 类型                                                      | 默认值 |
| ----------- | -------------- | --------------------------------------------------------- | ------ |
| root-class  | 组件根元素类名 | string                                                    | -      |
| root-style  | 组件根元素样式 | StyleValue                                                | -      |
| status      | 结果的状态     | 'success' \| 'info' \| 'warning' \| 'error' \| 'question' | 'info' |
| icon        | 图标名称       | string                                                    | -      |
| icon-family | 图标字体       | string                                                    | -      |
| icon-color  | 图标颜色       | string                                                    | -      |
| title       | 标题           | string                                                    | -      |
| description | 描述           | string                                                    | -      |

### ResultSlots

| 插槽        | 描述           | 属性 |
| ----------- | -------------- | ---- |
| default     | 自定义额外内容 | -    |
| title       | 自定义标题     | -    |
| description | 自定义描述     | -    |
| icon        | 自定义图标     | -    |

## 主题定制

### CSS 变量

@code('./variables.scss#variables')
